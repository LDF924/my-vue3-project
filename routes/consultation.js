const express = require('express');
const router = express.Router();

// 16.1 获取专家库列表 (Get Expert List)
router.get('/experts', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "陈教授",
                title: "特聘专家",
                organization: "广西农业科学院果树研究所",
                rating: 4.9,
                serviceCount: 128,
                description: "专注柑橘种植30年...",
                pricePerHour: 500,
                image: "/images/experts/expert1.jpg"
            }
        ]
    });
});

// 16.2 提交专家指导预约 (Submit Expert Consultation Reservation)
router.post('/reservations', (req, res) => {
    const { name, phone, consultationType, plantingScale, content, expectedTime, expertId } = req.body;
    res.json({
        code: 200,
        message: '预约提交成功，我们将尽快与您联系！',
        data: { reservationId: 'CON20240527001' }
    });
});

module.exports = router; 