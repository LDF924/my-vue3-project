const express = require('express');
const router = express.Router();

// 3.1 获取首页数据 (Get Home Data)
router.get('/data', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            totalOutput: '1200吨',
            totalFarmers: '500户',
            recentNews: [
                { "id": 1, "title": "新闻标题1", "date": "2023-10-26" },
                { "id": 2, "title": "新闻标题2", "date": "2023-10-25" }
            ],
            chartData: {
                labels: ["1月", "2月", "3月"],
                datasets: [{ "label": "产量", "data": [100, 120, 150] }]
            }
        }
    });
});

module.exports = router; 