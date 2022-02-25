import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import validator from 'validator'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Your password must be longer than 6 characters']
    },
    imageUrl: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    },
    shippingAddress: {
        address: { type: String, required: true, default: "Address" },
        city: { type: String, required: true, default: "City" },
        postalCode: { type: String, required: true, default: "postalCode" },
        country: { type: String, required: true, default: "Country" }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

export default mongoose.models.User || mongoose.model('User', userSchema)