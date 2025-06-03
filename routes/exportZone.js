const express = require('express');
const router = express.Router();

// 21.1 提交出口专区服务申请 (Submit Export Zone Service Application)
router.post('/applications', (req, res) => {
    const { companyName, contactPerson, phone, serviceType, note } = req.body;
    res.json({
        code: 200,
        message: '申请已提交，我们会尽快与您联系！',
        data: null
    });
});

// 21.2 PayPal 支付集成 - 创建订单 (Create Order)
router.post('/paypal/orders/create', (req, res) => {
    const { amount, currency, description, items } = req.body;
    res.json({
        code: 200,
        message: '订单创建成功',
        data: { orderId: 'PAYPAL_ORDER_ID_XYZ', approveUrl: 'https://www.paypal.com/checkout?token=...' }
    });
});

// 21.2 PayPal 支付集成 - 捕获订单 (Capture Order)
router.post('/paypal/orders/:orderId/capture', (req, res) => {
    const { orderId } = req.params;
    const { payerId } = req.body;
    res.json({
        code: 200,
        message: '支付成功',
        data: { transactionId: 'PAYPAL_TRANSACTION_ID_DEF', status: 'COMPLETED' }
    });
});

// 21.3 获取国际贸易规则知识库内容 (Get International Trade Rules Knowledge Base Content)
router.get('/trade-rules/knowledge-base', (req, res) => {
    const { category, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "最新RCEP协定解读",
                content: "RCEP协定生效对农产品出口的影响...",
                category: "政策解读",
                publishDate: "2024-05-20",
                attachments: ["url_to_document1"]
            }
        ]
    });
});

module.exports = router; 