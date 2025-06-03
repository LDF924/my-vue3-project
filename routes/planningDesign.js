const express = require('express');
const router = express.Router();

// 38.1 提交规划设计需求 (Submit Planning & Design Request)
router.post('/requests', (req, res) => {
    const { applicantName, contactPhone, projectType, area, location, requirements, attachments } = req.body;
    res.json({
        code: 200,
        message: '规划设计需求已提交',
        data: { designRequestId: 'PDRQ20240527001' }
    });
});

// 38.2 获取设计方案列表 (Get Design Solutions List)
router.get('/solutions', (req, res) => {
    const { userId, status } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                designRequestId: "PDRQ20240527001",
                solutionName: "武鸣沃柑智慧果园规划方案",
                status: "已完成",
                designDate: "2024-05-20",
                designTeam: "智慧农业设计院",
                previewUrl: "url_to_preview_pdf",
                description: "包含了果园分区、灌溉系统、道路规划等详细内容。"
            }
        ]
    });
});

module.exports = router; 