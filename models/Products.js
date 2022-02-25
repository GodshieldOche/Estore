import mongoose from 'mongoose'



const productSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please product name'],
        maxLength: [50, 'your name cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description'],
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            createdAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: [true, 'Please enter product category'],
        enum: {
            values: [
                "Supermarket",
                "Health",
                "Beauty",
                "Home",
                "Office",
                "Phones",
                "Tablets",
                "Computing",
                "Electronics",
                "Fashion",
                "Baby",
                "Gaming",
                "Sporting",
                "Automobile",
            ],
            message: 'Please select correct category for product'
        }
    },
    colors: [{
        type: String,
        enum: {
            values: [
                "red", "yellow",
                "blue", "brown",
                "orange", "green",
                "violet", "black",
            ],
            message: 'Please select correct color for product'
        }
    }],
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
})


export default mongoose.models.Product || mongoose.model('Product', productSchema)