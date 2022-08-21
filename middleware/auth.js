import { getSession } from 'next-auth/react'

const grapqlContext = async ({req, res}) => {
    const session = await getSession({req})

    return { session };
}

const isAuthenticatedUser = async (req, res, next) => {
    try {
        const session = await getSession({ req })
        if (!session) {
           throw new Error('login first to access this resource')
        }

        req.user = session.user;
        next()
    } catch (error) {
        next(error)
    }
    
}


const authorizeRoles = (...roles) => {
    try {
        return (req, res, next) => {
            if (!roles.includes(req.user.role)) {
                throw new Error(`Role (${req.user.role}) is not allowed to access this resource`)
            }
            next()
        }
    } catch (error) {
        next(error)
    }
    
}


export {
    isAuthenticatedUser,
    authorizeRoles,
    grapqlContext
}