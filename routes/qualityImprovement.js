const express = require('express');
const router = express.Router();

// 43.1 获取品质提升技术方案 (Get Quality Improvement Solutions)
router.get('/solutions', (req, res) => {
    const { aspect, stage, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "通过水肥管理提升沃柑糖度",
                aspect: "糖度",
                stage: "结果期",
                summary: "科学控制水分，合理施用钾肥，有效提高沃柑糖度。",
                author: "农业专家",
                publishDate: "2023-11-01",
                contentUrl: "url_to_detail_page"
            },
            {
                id: 2,
                title: "沃柑着色技术与管理",
                aspect: "色泽",
                stage: "转色期",
                summary: "影响沃柑着色的因素分析及提升着色均匀性的方法。",
                author: "技术推广站",
                publishDate: "2024-01-10",
                contentUrl: "url_to_detail_page"
            }
        ]
    });
});

// 43.2 提交品质问题反馈 (Submit Quality Problem Feedback)
router.post('/feedback', (req, res) => {
    const { userId, problemType, description, images, contactInfo } = req.body;
    res.json({
        code: 200,
        message: '品质问题反馈已提交，我们会安排专家对接',
        data: { feedbackId: "QIFB20240527001" }
    });
});

module.exports = router; 