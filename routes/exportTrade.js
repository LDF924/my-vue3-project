const express = require('express');
const router = express.Router();

// 20.1 提交出口申请 (Submit Export Application)
router.post('/applications', (req, res) => {
    const { companyName, contactPerson, phone, country, product, weight, note } = req.body;
    res.json({
        code: 200,
        message: '申请已提交，我们会尽快与您联系！',
        data: null
    });
});

module.exports = router; 