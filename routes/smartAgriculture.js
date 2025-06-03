const express = require('express');
const router = express.Router();

// 44.1 获取智慧农业概览数据 (Get Smart Agriculture Overview)
router.get('/overview', (req, res) => {
    const { orchardId } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            deviceCount: 20,
            onlineDevices: 18,
            sensorData: {
                temperature: 26.1,
                humidity: 75.8,
                soilMoisture: 62
            },
            farmTaskSummary: {
                totalTasks: 50,
                pendingTasks: 5,
                completedTasks: 45
            },
            alertsCount: 2,
            recentAlerts: ["设备离线：灌溉泵1", "温度异常：大棚2"]
        }
    });
});

// 44.2 获取环境监测数据 (Get Environmental Monitoring Data)
router.get('/environmental-data', (req, res) => {
    const { orchardId, sensorId, dataType, timeRange } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            orchardId: parseInt(orchardId),
            dataType: dataType,
            unit: "℃",
            timestamps: ["2024-05-27T08:00:00Z", "2024-05-27T09:00:00Z"],
            values: [25.5, 26.0]
        }
    });
});

// 44.3 获取智能决策建议 (Get Smart Decision Suggestions)
router.get('/decision-suggestions', (req, res) => {
    const { orchardId, cropStage, queryType } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            orchardId: parseInt(orchardId),
            suggestionType: "irrigation",
            suggestion: "当前土壤湿度偏低，建议立即进行一次2小时的滴灌。",
            recommendedAction: { command: "start_irrigation", duration: 120 }
        }
    });
});

module.exports = router; 