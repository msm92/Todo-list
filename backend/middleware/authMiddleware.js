const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    let token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ code: 0, msg: "token not exist" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(402).json({ code: 0, msg: "token not valid" });
    }
};
