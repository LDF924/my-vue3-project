const express = require('express');
const router = express.Router();

// 45.1 获取仓储库存概览 (Get Warehouse Inventory Overview)
router.get('/inventory/overview', (req, res) => {
    const { warehouseId } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            totalStock: "500吨",
            productCategories: [
                { name: "沃柑", stock: "300吨" },
                { name: "沙糖桔", stock: "200吨" }
            ],
            locationUtilization: { occupied: 75, available: 25 },
            recentInbound: 50,
            recentOutbound: 30
        }
    });
});

// 45.2 获取入库记录 (Get Inbound Records)
router.get('/inbound-records', (req, res) => {
    const { warehouseId, dateRange } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                recordId: 1,
                productName: "武鸣沃柑A级",
                quantity: "20吨",
                inboundDate: "2024-05-25",
                supplier: "幸福果园",
                operator: "仓库管理员A"
            }
        ]
    });
});

// 45.3 获取出库记录 (Get Outbound Records)
router.get('/outbound-records', (req, res) => {
    const { warehouseId, dateRange } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                recordId: 1,
                productName: "武鸣沃柑A级",
                quantity: "15吨",
                outboundDate: "2024-05-26",
                receiver: "广州批发商",
                operator: "仓库管理员B"
            }
        ]
    });
});

// 45.4 提交入库/出库申请 (Submit Inbound/Outbound Application)
router.post('/inventory-applications', (req, res) => {
    const { type, warehouseId, productName, quantity, supplier, expectedDate, receiver } = req.body;
    res.json({
        code: 200,
        message: '入库/出库申请已提交',
        data: { applicationId: 'INVAPP20240527001' }
    });
});

module.exports = router; 