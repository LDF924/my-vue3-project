const express = require('express');
const router = express.Router();

// 4.1 获取市场行情数据 (Get Market Data)
router.get('/data', (req, res) => {
    const { type, region } = req.query;

    // 实际业务逻辑：根据 type 和 region 获取市场行情数据
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            currentPrice: '5.5元/斤',
            trendData: {
                labels: ["周一", "周二", "周三"],
                datasets: [{ "label": "价格", "data": [5.0, 5.2, 5.5] }]
            },
            marketAnalysis: '近期沃柑价格稳中有升...'
        }
    });
});

module.exports = router; 