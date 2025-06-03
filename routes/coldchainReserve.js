const express = require('express');
const router = express.Router();

// 14.1 提交冷链运输预约 (Submit Cold Chain Transportation Reservation)
router.post('/reservations', (req, res) => {
    const { name, phone, startLocation, endLocation, goodsType, weight, expectedDepartureTime, remark } = req.body;
    res.json({
        code: 200,
        message: '预约信息已提交，我们会尽快与您联系！',
        data: { reservationId: 'CLR20240527001' }
    });
});

module.exports = router; 