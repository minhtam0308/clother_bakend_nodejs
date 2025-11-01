const db = require("../config/db");

// Lấy tất cả user
const getUser = async (email) => {
    //get user hac same email
    const [user] = await db.query(`
        SELECT *
        FROM user 
        WHERE email = '${email}'
        LIMIT 1`);

    return user;
};
// Lấy tất cả user
const getUserByid = async (id) => {
    //get user hac same email
    const [user] = await db.query(`
        SELECT *
        FROM user 
        WHERE makh = '${id}'
        LIMIT 1`);

    return user;
};

const getAllUser = async () => {
    //get user hac same email
    const [user] = await db.query(`
        SELECT *
        FROM user 
        `);

    return user;
};

// Lấy tất cả user
const postUser = async (full_name, email, password_hash) => {
    //get user hac same email
    const [user] = await db.query(`
    INSERT INTO user (ten_khachhang, email, matkhau) 
    VALUES ('${full_name}', '${email}', '${password_hash}')
    `);

    return user;
};

const putUpLevelUser = async (id, role) => {
    //get user hac same email
    const [user] = await db.query(`
        UPDATE user
        SET role = '${role}'
        WHERE makh = ${id};
    `);

    return user;
};

const putEditBanUser = async (id, status) => {
    //get user hac same email
    const [user] = await db.query(`
        UPDATE user
        SET status = '${status}'
        WHERE makh = ${id};
    `);

    return user;
};

const deleteUser = async (id) => {
    //get user hac same email
    const [user] = await db.query(`
        DELETE FROM user
        WHERE makh = ${id};       
    `);

    return user;
};

module.exports = {
    getUser,
    postUser,
    getAllUser,
    putUpLevelUser,
    putEditBanUser,
    deleteUser,
    getUserByid
}