const mysql = require("mysql2/promise");

// Tạo pool kết nối (nên dùng pool để tái sử dụng connection)
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "clotherteamdb",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool;