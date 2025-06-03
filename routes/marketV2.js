const express = require('express');
const router = express.Router();

// 33.1 获取市场行情概览 (Get Market Overview)
router.get('/overview', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            mainProduct: "沃柑",
            averagePrice: 6.2,
            priceTrend: "上涨",
            totalVolume: "15000吨 (本月)",
            hotProducts: [
                { name: "武鸣沃柑", price: 6.8, trend: "上涨" },
                { name: "沙糖桔", price: 4.5, trend: "持平" }
            ]
        }
    });
});

// 33.2 获取分地区市场数据 (Get Regional Market Data)
router.get('/regions/:regionName/data', (req, res) => {
    const { regionName } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            region: regionName,
            products: [
                { name: "沃柑", price: 7.0, supplyStatus: "充足" },
                { name: "沙糖桔", price: 4.8, supplyStatus: "偏紧" }
            ],
            analysis: "广州市场需求旺盛，沃柑价格略高于平均水平。"
        }
    });
});

// 33.3 获取历史价格数据 (Get Historical Price Data)
router.get('/products/:productId/history-prices', (req, res) => {
    const { productId } = req.params;
    const { timeframe } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            productId: parseInt(productId),
            productName: "沃柑",
            labels: ["2024-05-20", "2024-05-21", "2024-05-22"],
            prices: [6.0, 6.1, 6.2]
        }
    });
});

module.exports = router; 