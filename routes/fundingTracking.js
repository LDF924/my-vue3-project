const express = require('express');
const router = express.Router();

// 25.1 获取资金流向记录 (Get Fund Flow Records)
router.get('/records', (req, res) => {
    const { projectId, type, dateRange, payerId, receiverId } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                transactionId: "TXN20240527001",
                type: "补贴",
                amount: 10000,
                currency: "CNY",
                payer: "农业局",
                receiver: "王庄农户",
                date: "2024-05-20",
                description: "2024年沃柑种植补贴"
            },
            {
                id: 2,
                transactionId: "TXN20240527002",
                type: "贷款",
                amount: 50000,
                currency: "CNY",
                payer: "某银行",
                receiver: "李强合作社",
                date: "2024-05-25",
                description: "扩大种植规模贷款"
            }
        ]
    });
});

// 25.2 获取资金统计概览 (Get Fund Statistics Overview)
router.get('/overview', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            totalFundingAmount: 12000000,
            subsidyAmount: 3000000,
            loanAmount: 7000000,
            investmentAmount: 2000000,
            fundDistribution: {
                "补贴": 25,
                "贷款": 58,
                "投资": 17
            }
        }
    });
});

module.exports = router; 