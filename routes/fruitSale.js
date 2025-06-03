const express = require('express');
const router = express.Router();

// 24.1 获取销售商品列表 (Get Sale Products List)
router.get('/products', (req, res) => {
    const { category, origin, priceRange, page, limit } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "武鸣特优沃柑",
                pricePerKg: 6.5,
                minOrderQuantity: "100kg",
                origin: "广西南宁武鸣区",
                grade: "一级",
                image: "url_to_image",
                stock: 5000
            }
        ]
    });
});

// 24.2 获取商品详情 (Get Product Details)
router.get('/products/:productId', (req, res) => {
    const { productId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            id: parseInt(productId),
            name: "武鸣特优沃柑",
            description: "武鸣核心产区直供，糖度14-16，汁多肉脆。",
            pricePerKg: 6.5,
            minOrderQuantity: "100kg",
            origin: "广西南宁武鸣区",
            grade: "一级",
            images: ["url_to_image1", "url_to_image2"],
            stock: 5000,
            sellerInfo: { "id": 101, "name": "武鸣果农合作社", "contact": "13912345678" }
        }
    });
});

// 24.3 提交采购订单 (Submit Purchase Order)
router.post('/orders', (req, res) => {
    const { buyerId, productId, quantity, deliveryAddress, contactName, contactPhone, paymentMethod, remark } = req.body;
    res.json({
        code: 200,
        message: '订单提交成功',
        data: { orderId: "FRUITORDER20240527001", totalAmount: 3250 }
    });
});

module.exports = router; 