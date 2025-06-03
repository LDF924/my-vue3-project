const express = require('express');
const router = express.Router();

// 29.1 获取直播列表 (Get Live Streams List)
router.get('/streams', (req, res) => {
    const { status, category } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "武鸣沃柑采摘季直播",
                streamer: "小李果农",
                status: "live",
                viewerCount: 1500,
                thumbnailUrl: "url_to_thumbnail",
                streamUrl: "rtmp://...",
                startTime: "2024-05-27T10:00:00Z",
                category: "产品销售"
            },
            {
                id: 2,
                title: "专家教你如何防治沃柑溃疡病",
                streamer: "陈教授",
                status: "upcoming",
                scheduledTime: "2024-05-28T14:00:00Z",
                thumbnailUrl: "url_to_thumbnail",
                category: "种植技术"
            }
        ]
    });
});

// 29.2 获取直播间详情 (Get Live Stream Details)
router.get('/streams/:streamId', (req, res) => {
    const { streamId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            id: parseInt(streamId),
            title: "武鸣沃柑采摘季直播",
            streamer: { "id": 101, "name": "小李果农", "avatar": "url_to_avatar" },
            streamUrl: "rtmp://your_live_server/live/stream1",
            chatHistory: [
                { "userId": 201, "username": "观众A", "message": "沃柑看起来很新鲜！", "timestamp": "12:01" }
            ],
            productsForSale: [
                { "productId": 1, "name": "新鲜沃柑5kg", "price": 59.9, "stock": 100 }
            ]
        }
    });
});

// 29.3 发送直播间消息 (Send Live Stream Message)
router.post('/streams/:streamId/chat', (req, res) => {
    const { streamId } = req.params;
    const { userId, username, message } = req.body;
    res.json({
        code: 200,
        message: '消息发送成功',
        data: null
    });
});

// 29.4 购买直播间商品 (Purchase Live Stream Product)
router.post('/streams/:streamId/purchase', (req, res) => {
    const { streamId } = req.params;
    const { userId, productId, quantity, deliveryAddress, contactPhone } = req.body;
    res.json({
        code: 200,
        message: '购买成功，订单已生成',
        data: { orderId: "LIVEORDER20240527001" }
    });
});

module.exports = router; 