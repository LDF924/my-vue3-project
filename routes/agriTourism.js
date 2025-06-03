const express = require('express');
const router = express.Router();

// 7.1 采摘预约 (Picking Reservation)
router.post('/reservations/picking', (req, res) => {
    const { name, phone, date } = req.body;
    res.json({
        code: 200,
        message: '采摘预约成功',
        data: { reservationId: 'PR20240527001' }
    });
});

// 7.2 农事体验报名 (Farm Activity Registration)
router.post('/registrations/activity', (req, res) => {
    const { activityType, name, phone } = req.body;
    res.json({
        code: 200,
        message: '报名成功',
        data: { registrationId: 'AR20240527001' }
    });
});

module.exports = router; 