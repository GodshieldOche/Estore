import User from '../models/User'


// Register User
// Post => /api/auth/register

const registerUser = async (req, res, next) => {
    const { name, email, imageUrl, password } = req.body

    try {
        const user = await User.create({
            name,
            email,
            imageUrl,
            password
        })

        res.status(200).json({
            success: true,
            message: "registered User"
        })
    } catch (error) {
       next(error)
    }
    
    
}

// Current User
// get => /api/auth/register

const currentUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({
            success: 'true',
            user
        })
    } catch (error) {
        next(error)
    }
    
}


export {
    registerUser,
    currentUser
}