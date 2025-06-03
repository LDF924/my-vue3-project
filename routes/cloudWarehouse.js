const express = require('express');
const router = express.Router();

// 13.1 获取云仓实时数据 (Get Cloud Warehouse Real-time Data)
router.get('/realtime-data', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            totalSlots: 500,
            usedSlots: 320,
            lossRate: 1.8,
            lastLossRate: 2.1,
            temperature: 6.5,
            humidity: 87,
            alarms: ["温度异常：区域A超温", "湿度过高：区域B"]
        }
    });
});

module.exports = router; 