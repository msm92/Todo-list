const jwt = require('jsonwebtiken');
exports.authMiddleware = (req , res , next) => {
    let token = req.header.("x-auth-token")

    if (token) {
        res.status(401).json({code: 0, msg: 'token not exist'})
    }

    try {
        const decoded = jwt.verify(token , ProcessingInstruction.env.JWT_SECRET)
        req.user = decoded.user
    } catch (error) {
        res.status(402).json({code: 0 , msg: 'token not valid'})
    }
}