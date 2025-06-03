const express = require('express');
const router = express.Router();

// 42.1 获取加工产品列表 (Get Processed Products List)
router.get('/products', (req, res) => {
    const { category, brand } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "武鸣沃柑原汁",
                category: "果汁",
                brand: "鸣果",
                specifications: "250ml/瓶",
                price: "8元/瓶",
                description: "100%武鸣沃柑鲜榨，无添加。",
                imageUrl: "url_to_image"
            },
            {
                id: 2,
                name: "沃柑果干",
                category: "果干",
                brand: "甜橙工坊",
                specifications: "100g/袋",
                price: "15元/袋",
                description: "低温烘干，保留沃柑风味。",
                imageUrl: "url_to_image"
            }
        ]
    });
});

// 42.2 提交加工订单 (Submit Processing Order)
router.post('/orders', (req, res) => {
    const { userId, rawMaterialId, processingType, quantityKg, expectedProduct, packagingRequirements, deliveryDate, contactInfo } = req.body;
    res.json({
        code: 200,
        message: '加工订单已提交',
        data: { processingOrderId: "PROCORDER20240527001" }
    });
});

module.exports = router; 