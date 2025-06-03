const express = require('express');
const router = express.Router();

// 6.1 发布供应信息 (Publish Listing)
router.post('/', (req, res) => {
    const { product, quantity, quality, contact, remark } = req.body;
    res.json({
        code: 200,
        message: '供应信息发布成功',
        data: { listingId: 101 }
    });
});

// 6.2 获取挂牌信息列表 (Get Listings List)
router.get('/', (req, res) => {
    const { page, limit, sortBy } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 101,
                product: "武鸣沃柑",
                quantity: "50000斤",
                quality: "糖度14°Brix",
                contact: "13812345678",
                remark: "产地直发，品质保证",
                publishTime: "2024-05-27 10:00:00"
            }
        ]
    });
});

// 6.3 一键询盘 (One-Click Inquiry)
router.post('/inquire', (req, res) => {
    const { listingId, buyerId, buyerContact, inquiryMessage } = req.body;
    res.json({
        code: 200,
        message: '询盘意向已发送',
        data: null
    });
});

module.exports = router; 