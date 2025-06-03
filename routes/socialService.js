const express = require('express');
const router = express.Router();

// 46.1 获取社会服务项目列表 (Get Social Service Projects List)
router.get('/projects', (req, res) => {
    const { type, region } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "武鸣区青年农民技术培训",
                type: "技术培训",
                organizer: "武鸣区农业局",
                startDate: "2024-06-01",
                endDate: "2024-06-10",
                location: "武鸣区农技中心",
                description: "针对青年农民的沃柑种植技能提升培训。",
                status: "报名中"
            }
        ]
    });
});

// 46.2 申请社会服务项目 (Apply for Social Service Project)
router.post('/applications', (req, res) => {
    const { projectId, applicantName, contactPhone, remark } = req.body;
    res.json({
        code: 200,
        message: '社会服务项目申请成功',
        data: { applicationId: "SSAPP20240527001" }
    });
});

module.exports = router; 