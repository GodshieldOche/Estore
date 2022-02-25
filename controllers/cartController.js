import User from '../models/User'

// Add product to Cart
// post => /api/cart

const addToCart = async (req, res, next) => {
    const { prodId, quantity } = req.body

    const cartItem = {
        productId: prodId,
        quantity
    }

    try {
        const user = await User.findById(req.user._id)
        
        const inCart = user.cart.items.find(item => item.productId.toString() === prodId.toString())

        if (inCart) {
            user.cart.items.forEach(item => {
                if (item.productId.toString() === prodId.toString()) {
                    item.quantity = quantity
                }
            })
        } else {
            user.cart.items.push(cartItem)
        }

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            message: "Product Added to Cart, View Cart"
        })
    } catch (error) {
        next(error)
    }


}

// Get Cart Items
// get => /api/cart

const getCartItems = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id).populate({
            path: 'cart.items.productId',
            select: 'name price images countInStock'
        })
        
        const cartItems = user.cart.items

        res.status(200).json({
            success: true,
            cartItems
        })
    } catch (error) {
        next(error)
    }


}

// Delete cart Item
// delete => /api/cart/:id

const deleteCartItem = async (req, res, next) => {

    const id = req.query.id

    try {
        const user = await User.findById(req.user._id)

        const updatedCartItems = user.cart.items.filter(item => item._id.toString() !== id.toString())
        
        user.cart.items = updatedCartItems

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            message: "Item Deleted"
        })
    } catch (error) {
        next(error)
    }


}

// Delete cart Items
// delete => /api/cart/

const deleteCartItems = async (req, res, next) => {


    try {
        const user = await User.findById(req.user._id)

        const updatedCartItems = user.cart.items.filter(item => item._id.toString() !== item._id.toString() )
        
        user.cart.items = updatedCartItems

        await user.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            message: "Items Deleted"
        })
    } catch (error) {
        next(error)
    }


}


export {
    addToCart,
    getCartItems,
    deleteCartItem,
    deleteCartItems
}