const express = require('express');
const router = express.Router();

// 36.1 提交农药使用报告 (Submit Pesticide Usage Report)
router.post('/', (req, res) => {
    const { orchardId, applicationDate, pesticideName, dosage, applicationMethod, operator, remark } = req.body;
    res.json({
        code: 200,
        message: '农药使用报告提交成功',
        data: { reportId: "PU20240527001" }
    });
});

// 36.2 获取农药使用报告列表 (Get Pesticide Usage Reports List)
router.get('/', (req, res) => {
    const { orchardId, dateRange } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                orchardId: 101,
                applicationDate: "2024-05-20",
                pesticideName: "代森锰锌",
                dosage: "50g/亩",
                applicationMethod: "叶面喷施",
                operator: "张三",
                remark: "防治炭疽病"
            }
        ]
    });
});

module.exports = router; 