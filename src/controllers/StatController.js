const { getTotalRevenue, getTotalOrders, getTotalProducts, getTotalCustomers, getOrdersData, getCateData } = require("../models/stat");

exports.GetStat = async (req, res) => {
    try {
        const totalRevenue = await getTotalRevenue();
        const totalOrders = await getTotalOrders();
        const totalProducts = await getTotalProducts();
        const totalCustomers = await getTotalCustomers();
        // console.log(results)
        return res.json(
            {
                totalRevenue: totalRevenue,
                totalOrders: totalOrders,
                totalProducts: totalProducts,
                totalCustomers: totalCustomers
            }
        );
    } catch (err) {
        return res.status(500);
    }
}

exports.GetOrdersData = async (req, res) => {
    try {
        const month = new Date().getMonth() + 1;
        let ordersData = [
            { month: `T${(month - 5 + 12 - 1) % 12 + 1}`, completed: 0, cancelled: 0, returned: 0 },
            { month: `T${(month - 4 + 12 - 1) % 12 + 1}`, completed: 0, cancelled: 0, returned: 0 },
            { month: `T${(month - 3 + 12 - 1) % 12 + 1}`, completed: 0, cancelled: 0, returned: 0 },
            { month: `T${(month - 2 + 12 - 1) % 12 + 1}`, completed: 0, cancelled: 0, returned: 0 },
            { month: `T${(month - 1 + 12 - 1) % 12 + 1}`, completed: 0, cancelled: 0, returned: 0 },
            { month: "T" + month, completed: 0, cancelled: 0, returned: 0 }
        ];
        const stats = await getOrdersData();
        for (const values of stats) {
            let monthTemp = new Date(values.ngay_lap).getMonth() + 1;
            if (values.trangthai === 'da_giao') {
                ordersData[(monthTemp - (month - 5)) % 12].completed = values.soluong;
            } else if (values.trangthai === 'cho_xu_ly') {
                //returned = cho_xu_ly
                ordersData[(monthTemp - (month - 5)) % 12].returned = values.soluong;

            } else if (values.trangthai === 'huy') {
                ordersData[(monthTemp - (month - 5)) % 12].cancelled = values.soluong;
            }
        }
        // console.log(ordersData)
        return res.json(ordersData);
    } catch (err) {
        return res.status(500);
    }
}

exports.GetRevenue = async (req, res) => {
    try {
        const month = new Date().getMonth() + 1;
        let revenueData = [
            { month: `T${(month - 5 + 12 - 1) % 12 + 1}`, revenue: 0 },
            { month: `T${(month - 4 + 12 - 1) % 12 + 1}`, revenue: 0 },
            { month: `T${(month - 3 + 12 - 1) % 12 + 1}`, revenue: 0 },
            { month: `T${(month - 2 + 12 - 1) % 12 + 1}`, revenue: 0 },
            { month: `T${(month - 1 + 12 - 1) % 12 + 1}`, revenue: 0 },
            { month: `T${month}`, revenue: 0 }
        ];
        const totalRevenue = await getTotalRevenue();
        for (const values of totalRevenue) {
            let monthTemp = new Date(values.ngay_lap).getMonth() + 1;
            revenueData[(monthTemp - (month - 5)) % 12].revenue = totalRevenue[0].total;
        }
        // console.log(totalRevenue)

        return res.json(revenueData);
    } catch (err) {
        return res.status(500);
    }
}

exports.GetCategoryData = async (req, res) => {
    try {

        let categoryData = [];
        const dataCate = await getCateData();
        for (const item of dataCate) {
            const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
            categoryData.push({ ...item, color })
        }
        // console.log(categoryData);
        return res.json(categoryData);
    } catch (err) {
        return res.status(500);
    }
}