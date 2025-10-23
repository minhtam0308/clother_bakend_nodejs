const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const whileList = [
        '/api/user/login',
        "/api/user/register",
        '/api/pro/getAllPro',
        '/api/pro/getDetailProductsById',
        '/api/pro/getProductsById',
        '/api/cate/getAllCategory',
        '/api/pro/getProductsByCate',
        '/api/pro/getProductsByName',

    ];
    const adminList = [
        '/api/pro/postCreateProduct',
        '/api/pro/postCreateProductDetail',
        '/api/pro/putEditPro',
        '/api/pro/delProduct',
        '/api/user/account',
        '/api/cate/getAllCategoryByAdmin',
    ];
    // console.log(req.baseUrl);
    if (whileList.includes(req.baseUrl)) {
        // console.log('include');
        next();
        return;
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        // console.log('asdasd')
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "my-secret-key");
        req.user = decoded;
        if (adminList.includes(req.baseUrl)) {
            if (decoded.role !== 'admin') {
                return res.json({
                    EC: 10,
                    EM: "You do now have permision to do this"
                })
            }

        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;