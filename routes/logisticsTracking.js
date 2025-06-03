const express = require('express');
const router = express.Router();

// 32.1 查询物流订单 (Query Logistics Order)
router.get('/tracking/orders/:orderNumber', (req, res) => {
    const { orderNumber } = req.params;
    res.json({
        code: 200,
        message: '查询成功',
        data: {
            orderNumber: orderNumber,
            status: '运输中',
            origin: '武鸣区',
            destination: '广州市',
            currentLocation: '湖南衡阳服务区',
            estimatedArrivalTime: '2024-05-28T08:00:00Z',
            driverInfo: {
                name: '王师傅',
                phone: '136XXXXXXXX'
            },
            trackingHistory: [
                { timestamp: '2024-05-27T09:00:00Z', location: '武鸣区装车', status: '已发货' },
                { timestamp: '2024-05-27T15:00:00Z', location: '湖南衡阳服务区，预计停留1小时', status: '运输中' }
            ],
            temperatureData: [
                { timestamp: '2024-05-27T10:00:00Z', temperature: 5.2 },
                { timestamp: '2024-05-27T11:00:00Z', temperature: 5.5 }
            ]
        }
    });
});

// 32.2 获取我的物流订单 (Get My Logistics Orders)
router.get('/tracking/my-orders', (req, res) => {
    const { userId, status } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                orderNumber: 'ABC123456789',
                status: '运输中',
                origin: '武鸣区',
                destination: '广州市',
                currentLocation: '湖南衡阳服务区',
                estimatedArrivalTime: '2024-05-28T08:00:00Z',
                driverInfo: {
                    name: '王师傅',
                    phone: '136XXXXXXXX'
                },
                trackingHistory: [
                    { timestamp: '2024-05-27T09:00:00Z', location: '武鸣区装车', status: '已发货' }
                ]
            }
        ]
    });
});

module.exports = router; 