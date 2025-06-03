const express = require('express');
const router = express.Router();

// 11.1 申请碳汇项目 (Apply for Carbon Sink Project)
router.post('/applications', (req, res) => {
    const { orchardName, area, treeAge, contactPerson, contactPhone } = req.body;
    res.json({
        code: 200,
        message: '碳汇项目申请已提交',
        data: { applicationId: 'CA20240527001' }
    });
});

// 11.2 获取碳汇项目案例 (Get Carbon Sink Project Cases)
router.get('/cases', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "武鸣区沃柑示范园",
                area: 500,
                treeAge: 8,
                annualCarbonSequestration: 50,
                annualRevenue: 40000
            },
            {
                id: 2,
                name: "隆安县柑橘合作社",
                area: 300,
                treeAge: 5,
                annualCarbonSequestration: 25,
                annualRevenue: 20000
            }
        ]
    });
});

// 11.3 获取常见问题 (Get FAQs)
router.get('/faqs', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            { "question": "碳汇交易需要什么条件？", "answer": "答：需有规模化果园、合法土地手续、管理规范。" },
            { "question": "收益如何分配？", "answer": "答：交易完成后，平台按协议发放收益。" }
        ]
    });
});

module.exports = router; 