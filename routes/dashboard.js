const express = require('express');
const router = express.Router();

// 18.1 获取关键指标数据 (Get Key Metrics Data)
router.get('/metrics', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            totalArea: 15000,
            annualProduction: 12000,
            farmerCount: 850,
            averagePrice: 5.8
        }
    });
});

// 18.2 获取月度产量趋势数据 (Get Monthly Production Trend Data)
router.get('/production-trend', (req, res) => {
    const { year } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            labels: ["1月", "2月", "3月", "4月", "5月"],
            datasets: [
                {
                    "label": "月度产量 (吨)",
                    "data": [800, 950, 1100, 1050, 1200],
                    "borderColor": "#0F5132",
                    "backgroundColor": "rgba(15, 81, 50, 0.1)"
                }
            ]
        }
    });
});

// 18.3 获取种植区域分布数据 (Get Planting Region Distribution Data)
router.get('/region-distribution', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            labels: ["武鸣区", "隆安县", "马山县", "其他"],
            datasets: [
                {
                    "label": "种植面积 (亩)",
                    "data": [8000, 4000, 2000, 1000],
                    "backgroundColor": ["#0F5132", "#FF8C00", "#22C55E", "#F8F9FA"]
                }
            ]
        }
    });
});

// 18.4 获取品质指标数据 (Get Quality Metrics Data)
router.get('/quality-metrics', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            labels: ["糖度(°Brix)", "酸度(%)", "汁胞化率(%)", "可溶性固形物(%)", "色泽评分"],
            datasets: [
                {
                    "label": "平均品质",
                    "data": [14.5, 0.8, 95, 13.8, 4.5],
                    "borderColor": "#FF8C00",
                    "backgroundColor": "rgba(255, 140, 0, 0.2)"
                }
            ]
        }
    });
});

// 18.5 获取产业地图数据 (Get Industry Map Data)
router.get('/industry-map-data', (req, res) => {
    const { type } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "幸福沃柑种植基地",
                latitude: 23.2345,
                longitude: 108.3456,
                type: "farm",
                info: "种植面积500亩，年产量2000吨"
            }
        ]
    });
});

module.exports = router; 