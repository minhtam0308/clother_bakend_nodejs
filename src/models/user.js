const db = require("../config/db");

// Lấy tất cả user
const getUser = async (email) => {
    //get user hac same email
    const [user] = await db.query(`
        SELECT *
        FROM customers 
        WHERE email = '${email}'
        LIMIT 1`);

    return user;
};

// Lấy tất cả user
const postUser = async (full_name, email, password_hash) => {
    //get user hac same email
    const [user] = await db.query(`
    INSERT INTO customers (full_name, email, password_hash) 
    VALUES ('${full_name}', '${email}', '${password_hash}')
    `);

    return user;
};

module.exports = {
    getUser,
    postUser
}