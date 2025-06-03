const express = require('express');
const router = express.Router();

// 5.1 获取农资商品列表 (Get Agricultural Supplies List)
router.get('/products', (req, res) => {
    const { category, page, limit } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            total: 100,
            products: [
                { "id": 1, "name": "有机肥", "price": 80, "unit": "袋", "image": "url" },
                { "id": 2, "name": "杀虫剂", "price": 50, "unit": "瓶", "image": "url" }
            ]
        }
    });
});

// 5.2 获取农资商品详情 (Get Agricultural Supply Details)
router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            id: parseInt(productId),
            name: "有机肥",
            description: "高效环保有机肥...",
            price: 80,
            unit: "袋",
            stock: 500,
            images: ["url1", "url2"]
        }
    });
});

// 5.3 提交订单 (Submit Order)
router.post('/orders', (req, res) => {
    const { userId, items, shippingAddress, contactPhone } = req.body;
    res.json({
        code: 200,
        message: '订单提交成功',
        data: {
            orderId: "ORD20231026001",
            totalAmount: 210
        }
    });
});

module.exports = router; 