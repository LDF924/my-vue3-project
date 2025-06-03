const express = require('express');
const router = express.Router();

// 23.1 获取金融产品列表 (Get Financial Products List)
router.get('/products', (req, res) => {
    const { type, region } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "沃柑种植专项贷款",
                type: "贷款",
                provider: "某银行",
                interestRate: "年化4.5%",
                maxAmount: "50万元",
                description: "专为沃柑种植户设计的低息贷款，支持扩大种植规模。"
            },
            {
                id: 2,
                name: "农业政策性保险",
                type: "保险",
                provider: "某保险公司",
                coverage: "自然灾害、病虫害",
                premium: "保额的1%",
                description: "覆盖主要农业风险，保障农户收益。"
            }
        ]
    });
});

// 23.2 提交金融服务申请 (Submit Financial Service Application)
router.post('/applications', (req, res) => {
    const { userId, productId, applicantName, contactPhone, applicationDetails, requestedAmount } = req.body;
    res.json({
        code: 200,
        message: '金融服务申请已提交',
        data: { applicationId: 'FINAPP20240527001' }
    });
});

// 23.3 获取金融服务申请进度 (Get Financial Service Application Progress)
router.get('/applications/:applicationId/progress', (req, res) => {
    const { applicationId } = req.params;
    res.json({
        code: 200,
        message: '查询成功',
        data: {
            applicationId: applicationId,
            status: '审核中',
            currentStage: '资料审核',
            updateTime: '2024-05-27 11:30:00',
            remark: '您的资料正在由风控部门审核。'
        }
    });
});

module.exports = router; 