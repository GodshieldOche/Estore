import Product from '../models/Products'
import cloudinary from 'cloudinary'
import APIFeatures from '../utils/apiFeatures'


// setting up cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})



// ADMIN Create Product
// post => /api/products/

const createProduct = async (req, res, next) => {

    try {
        const images = req.body.images;
        let imageLinks = []

        for (let i = 0; i < images.length; i++) {

            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'estore/products'
            });

            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }

        req.body.images = imageLinks
        req.body.userId = req.user._id

        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        next(error)
    }

   
}


// ADMIN get all Products
// get => /api/products/

const adminProducts = async (req, res, next) => {

    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        next(error)
    }

   
}


//  get all Products
// get => /api/

const allProducts = async (req, res, next) => {

    try {
        const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()
        
        let products = await apiFeatures.query

        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        next(error)
    }


}

//  get Products details
// get => /api/products/:prodId

const prodDetails = async (req, res, next) => {
    const prodId = req.query.prodId

    try {

        const product = await Product.findById(prodId);
        if (product) {
            res.status(200).json({
                success: true,
                product
            })
        } else {
            throw new Error('Product not found')
        }
        
    } catch (error) {
        next(error)
    }


}

//  get latest products
// get => /api/products/:prodId

const getLatest = async (req, res, next) => {

    try {

        const products = await Product.find()
            .sort({createdAt: -1})
            .limit(4);
            res.status(200).json({
                success: true,
                products
            })
        
    } catch (error) {
        next(error)
    }


}


//  post Review
// post => /api/review/:id

const postReview = async (req, res, next) => {
    const id = req.query.id

    const {name, rating, comment} = req.body

    const review = {
        name,
        rating,
        comment,
        user: req.user._id
    }

    try {

        const product = await Product.findById(id)

        if (!product) {
            throw new Error('Product not found')
        } else {
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

            await product.save({ validateBeforeSave: false })

            res.status(200).json({
                success: true,
                message: "Review Submitted" 
            })

        }
           

    } catch (error) {
        next(error)
    }


}

//  get Reviews
// get => /api/review/:id

const getReviews = async (req, res, next) => {
    const id = req.query.id

    try {

        const product = await Product.findById(id).sort({ reviews: 1 }).populate({
            path: 'reviews.user',
            select: 'imageUrl'
        })

        if (!product) {
            throw new Error('Product not found')
        } else {
          
            

            res.status(200).json({
                success: true,
                reviews: product.reviews
            })

        }
           

    } catch (error) {
        next(error)
    }


}





export {
    createProduct,
    adminProducts,
    allProducts,
    prodDetails,
    getLatest,
    postReview,
    getReviews
}