import Order from "../models/Order"
import User from "../models/User"

// Get Shipping Address
// get => /api/order/shipping

const getShippingAddress = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id)

        const shippingAddress = user.shippingAddress

        res.status(200).json({
            success: true,
            shippingAddress
        })
    } catch (error) {
        next(error)
    }


}

// Update Shipping Address
// put => /api/order/shipping

const updateShippingAddress = async (req, res, next) => {
    const { address, city, postalCode, country } = req.body
    
    const shippingAddress = {
        address,
        city,
        postalCode,
        country
    }

    try {
        const user = await User.findById(req.user._id)

        user.shippingAddress = shippingAddress

        await user.save()

        res.status(200).json({
            success: true,
            message: 'Address Updated'
        })
    } catch (error) {
        next(error)
    }


}


// Order 
// post => /api/order/

const postOrder = async (req, res, next) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingFee,
        totalPrice
     } = req.body


    try {
         if (orderItems && orderItems.length == 0) {
        res.status(400)
        throw new Error('No Order Items')
         } else {
             const order = await Order.create({
                 user: req.user._id,
                 orderItems,
                 shippingAddress,
                 paymentMethod,
                 itemsPrice,
                 taxPrice,
                 shippingFee,
                 totalPrice
            })


             await order.save()
            const orderId = order._id
             res.status(201).json({
                 success: true,
                 message: 'Order created',
                 orderId
             })
        }
        


    } catch (error) {
        next(error)
    }


}



// Get Order Details
// post => /api/order/:id

const getOrderDetails = async (req, res, next) => {
    const { id } = req.query
    try {

        const order = await Order.findById(id).populate({
            path: 'orderItems.productId',
            select: 'name price images countInStock'
        }).populate({
            path: 'user',
            select: 'name email'
        })

        if (!order) {
            throw new Error('Order not found')
        } else {
            res.status(200).json({
                success: true,
                order
            })
        }

    }catch (error) {
        next(error)
    }


}


// Update order to paid
// put => /api/order/:id

const updatePaid = async (req, res, next) => {
    const { id, status, updateTime, emailAddress} = req.body
    try {

        const order = await Order.findById(req.query.id).populate({
            path: 'orderItems.productId',
            select: 'name price images countInStock'
        }).populate({
            path: 'user',
            select: 'name email'
        })

        if (!order) {
            throw new Error('Order not found')
        } else {
            order.isPaid = true
            order.paidAt = Date.now()
            order.paymentResult = {
                id,
                status,
                updateTime,
                emailAddress
            }
            
            await order.save()
            res.status(200).json({
                success: true,
                order
            })
        }

    }catch (error) {
        next(error)
    }


}


// Get All User Orders
// get => /api/order/

const getAllOrders = async (req, res, next) => {
   
    try {

        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            orders
        })

    }catch (error) {
        next(error)
    }


}


// Get Admin Orders
// get => /api/admin/order

const getAdminOrders = async (req, res, next) => {
   
    try {

        const orders = await Order.find().sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            orders
        })

    }catch (error) {
        next(error)
    }


}

// Admin Order Details
// post => /api/admin/order/:id

const adminOrderDetails = async (req, res, next) => {
    const { id } = req.query
    try {

        const order = await Order.findById(id).populate({
            path: 'orderItems.productId',
            select: 'name price images countInStock'
        }).populate({
            path: 'user',
            select: 'name email'
        })

        if (!order) {
            throw new Error('Order not found')
        } else {
            res.status(200).json({
                success: true,
                order
            })
        }

    } catch (error) {
        next(error)
    }


}

// Update order to delivered
// put => /api/admin/order/:id

const updateDelivered = async (req, res, next) => {
    
    try {

        const order = await Order.findById(req.query.id).populate({
            path: 'orderItems.productId',
            select: 'name price images countInStock'
        }).populate({
            path: 'user',
            select: 'name email'
        })

        if (!order) {
            throw new Error('Order not found')
        } else {
            order.isDelivered = true
            order.deliveredAt = Date.now()
        
            
            await order.save()
            res.status(200).json({
                success: true,
                order
            })
        }

    } catch (error) {
        next(error)
    }


}

// Delete Order
// Delete => /api/admin/order/:id

const deleteOrder = async (req, res, next) => {
    
    try {

        const order = await Order.findById(req.query.id)

        if (!order) {
            throw new Error('Order not found')
        } else {
            
            await order.remove()
            res.status(200).json({
                success: true,
                message: "Order Deleted"
            })
        }

    } catch (error) {
        next(error)
    }


}


// Get review items
// get => /api/review/items

const getReviewItems = async (req, res, next) => {
    
    try {
        let reviewItems = []

        const orders = await Order.find({ user: req.user._id, isDelivered: true }).sort({ createdAt: -1 }).populate({
            path: 'orderItems.productId',
            select: 'name price images countInStock'
        }).populate({
            path: 'user',
            select: 'name email'
        })


        orders.forEach(order => {
            // alreadyReviewed = reviewitems.find(i => i.productId._id ===)
            order.orderItems.forEach(item => {
                if (!item.isReviewed) {
                    const mItem = {item, orderId: order._id}
                    reviewItems.push(mItem)
                }
                
            })
        })
        
        res.status(200).json({
            success: true,
            reviewItems
        })

    } catch (error) {
        next(error)
    }


}

// update isReviewed to true
// put => /api/review/:id

const updateIsReviewed = async (req, res, next) => {

    const {orderId} = req.body

    try {
        const order = await Order.findById(orderId)

        order.orderItems.map(item => {
            if (item.productId.toString() === req.query.id.toString()) {
                item.isReviewed = true
            }
        })

        await order.save({validateBeforeSave: false})

        res.status(200).json({
            success: true,
        })

    } catch (error) {
        next(error)
    }


}


export {
    getShippingAddress,
    updateShippingAddress,
    postOrder,
    getOrderDetails,
    updatePaid,
    getAllOrders,
    getAdminOrders,
    adminOrderDetails,
    updateDelivered,
    getReviewItems,
    deleteOrder,
    updateIsReviewed
}