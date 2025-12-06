const cors = require('cors');
const express = require("express");
const routeUser = require("./routes/userRoute");
const routeProduct = require("./routes/productRoute");
const routeCate = require("./routes/cateRoute");
const routeCart = require("./routes/cartRoute");
const routeStat = require("./routes/statRoute");
const routeOrder = require("./routes/orderRoute");
const routeKhuyenMai = require("./routes/khuyenMaiRoute");
const routeThanhToan = require("./routes/ThanhToanRoute");
const { login } = require("./controllers/authController");
const authMiddleware = require("./middlewares/authMiddleware");
const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ extended: true, limit: '10mb' }));


//auth
app.use('*', authMiddleware);
//routes
app.use("/api/user", routeUser);
app.use("/api/pro", routeProduct);
app.use("/api/cate", routeCate);
app.use("/api/cart", routeCart);
app.use("/api/stat", routeStat);
app.use("/api/order", routeOrder);
app.use("/api/khuyenmai", routeKhuyenMai);
app.use("/api/thanhtoan", routeThanhToan);



app.listen(8080, () => {
    console.log("Server run on port 8080");
})