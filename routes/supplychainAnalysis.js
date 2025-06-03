const express = require('express');
const router = express.Router();

// 48.1 获取供应链数据概览 (Get Supply Chain Data Overview)
router.get('/overview', (req, res) => {
    const { timeframe } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            totalProcurement: "10000吨",
            currentInventory: "2000吨",
            totalSales: "8000吨",
            transportEfficiency: "95%",
            costAnalysis: { procurementCost: "500万元", logisticsCost: "50万元" },
            bottlenecks: ["高峰期物流压力大"]
        }
    });
});

// 48.2 获取供应链环节数据 (Get Supply Chain Segment Data)
router.get('/segments/:segmentType/data', (req, res) => {
    const { segmentType } = req.params;
    const { timeframe } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            segment: segmentType,
            metrics: [
                { date: "2024-05-01", quantity: 500, cost: 250000 },
                { date: "2024-05-15", quantity: 800, cost: 400000 }
            ],
            topSuppliers: ["供应商A", "供应商B"]
        }
    });
});

// 48.3 获取供应链风险预警 (Get Supply Chain Risk Alerts)
router.get('/risk-alerts', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                type: "物流延迟",
                description: "受天气影响，XX高速公路封闭，部分货物可能延迟24小时。",
                severity: "中",
                affectedOrders: ["ORD123", "ORD456"],
                timestamp: "2024-05-27T18:00:00Z"
            },
            {
                id: 2,
                type: "库存预警",
                description: "沃柑A级库存低于安全阈值，建议尽快补货。",
                severity: "高",
                affectedProduct: "沃柑A级",
                timestamp: "2024-05-27T17:30:00Z"
            }
        ]
    });
});

module.exports = router; 