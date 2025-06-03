const express = require('express');
const router = express.Router();

// 50.1 获取供应链金融产品 (Get Supply Chain Financial Products)
router.get('/products', (req, res) => {
    const { targetAudience, type } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "沃柑订单融资",
                type: "订单融资",
                targetAudience: "农户",
                description: "基于已确认的沃柑采购订单提供融资支持。",
                provider: "某金融机构",
                interestRate: "年化6%",
                maxAmount: "30万元"
            },
            {
                id: 2,
                name: "农产品库存质押贷款",
                type: "库存质押贷款",
                targetAudience: "加工商",
                description: "以符合条件的农产品库存作为质押物申请贷款。",
                provider: "某银行",
                interestRate: "年化5.5%",
                maxAmount: "100万元"
            }
        ]
    });
});

// 50.2 提交供应链金融申请 (Submit Supply Chain Financial Application)
router.post('/applications', (req, res) => {
    const { applicantId, productId, applicationDetails, attachments } = req.body;
    res.json({
        code: 200,
        message: '供应链金融申请已提交',
        data: { appId: "SCFAPP20240527001" }
    });
});

module.exports = router; 