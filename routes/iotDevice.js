const express = require('express');
const router = express.Router();

// 27.1 获取 IoT 设备列表 (Get IoT Devices List)
router.get('/devices', (req, res) => {
    const { userId, orchardId, type } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                deviceName: "土壤温湿度传感器1",
                deviceType: "传感器",
                location: "A区果园",
                status: "online",
                lastDataTime: "2024-05-27T12:00:00Z"
            },
            {
                id: 2,
                deviceName: "果园监控摄像头1",
                deviceType: "摄像头",
                location: "B区果园",
                status: "online",
                streamUrl: "rtmp://..."
            }
        ]
    });
});

// 27.2 获取设备实时数据 (Get Device Real-time Data)
router.get('/devices/:deviceId/realtime-data', (req, res) => {
    const { deviceId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            deviceId: parseInt(deviceId),
            timestamp: "2024-05-27T12:05:30Z",
            temperature: 25.3,
            humidity: 78.5,
            soilMoisture: 65,
            lightIntensity: 12000,
            batteryLevel: 85
        }
    });
});

// 27.3 控制 IoT 设备 (Control IoT Device)
router.post('/devices/:deviceId/control', (req, res) => {
    const { deviceId } = req.params;
    const { command, durationMinutes, area, direction, angle } = req.body;
    res.json({
        code: 200,
        message: '设备控制指令已发送',
        data: null
    });
});

module.exports = router; 