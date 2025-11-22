const { CheckKhuyenMai, getAllKhuyenMai, postCreateKM, deleteKM } = require("../models/khuyenmai");


exports.CheckKhuyenMaiController = async (req, res) => {
    const { macode } = req.query;
    // console.log({ order: resultsOder, inforUser })
    if (!macode) {
        return res.json(null);
    }
    const [km] = await CheckKhuyenMai(macode);
    return res.json(km);

};

exports.GetAllKhuyenMai = async (req, res) => {

    const km = await getAllKhuyenMai();
    return res.json(km);

};

exports.PostCreateKM = async (req, res) => {
    const { ma_code, gia_tri_giam, gioi_han_su_dung, km_tu_ngay, km_den_ngay } = req.body;
    const km = await postCreateKM(ma_code, gia_tri_giam, gioi_han_su_dung, km_tu_ngay, km_den_ngay);
    return res.json(km);

};

exports.DeleteKM = async (req, res) => {
    const { ma_code } = req.query;
    const km = await deleteKM(ma_code);
    return res.json(km);

};