const express = require('express');
const router = express.Router();

// 9.1 提交反馈 (Submit Feedback)
router.post('/submit-feedback', (req, res) => {
    const { name, email, feedback } = req.body;
    res.json({
        code: 200,
        message: '反馈提交成功！',
        data: null
    });
});

// 9.2 获取动态内容 (Get Dynamic Content)
router.get('/dynamic-content', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            title: '最新公示动态',
            items: [
                { "id": 1, "value": "关于2024年利益联结机制调整的通知" },
                { "id": 2, "value": "利益联结项目进展报告" }
            ]
        }
    });
});

module.exports = router; 