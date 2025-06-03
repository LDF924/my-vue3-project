const express = require('express');
const router = express.Router();

// 8.1 获取当前拍卖信息 (Get Current Auction Info)
router.get('/current', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            auctionId: 1,
            productName: "武鸣沃柑",
            startAmount: "5000斤",
            bidStep: "0.1元/斤",
            currentPrice: 5.8,
            endTime: "2024-05-28T10:00:00Z"
        }
    });
});

// 8.2 提交出价 (Submit Bid)
router.post('/bid', (req, res) => {
    const { auctionId, userId, bidAmount } = req.body;
    if (bidAmount > 5.8) { // 简单模拟出价逻辑
        res.json({
            code: 200,
            message: '出价成功',
            data: { newPrice: bidAmount }
        });
    } else {
        res.status(400).json({
            code: 400,
            message: '出价低于当前价格或无效',
            data: null
        });
    }
});

// 8.3 获取竞拍历史 (Get Auction History)
router.get('/history/:auctionId', (req, res) => {
    const { auctionId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            { "user": "用户A", "price": 5.7, "time": "09:00:01" },
            { "user": "用户B", "price": 5.8, "time": "09:01:15" }
        ]
    });
});

// 8.4 实时价格更新 (Real-time Price Updates)
// 注意: WebSocket 或长轮询实现超出当前 Express 路由的范围，需要单独的 WebSocket 服务器或实现长轮询逻辑。

module.exports = router; 