const express = require("express");
const routeUser = require("./routes/userRoute");
const { login } = require("./controllers/authController");
const app = express();

app.use(express.json());


//routes
app.use("/api/user", routeUser);



app.listen(8080, () => {
    console.log("Server run on port 8080");
})