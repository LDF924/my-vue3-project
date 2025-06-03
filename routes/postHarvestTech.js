const express = require('express');
const router = express.Router();

// 41.1 获取采后处理技术指南 (Get Post-Harvest Tech Guides)
router.get('/guides', (req, res) => {
    const { type, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "沃柑采后保鲜技术与冷链管理",
                type: "保鲜",
                summary: "详细介绍采摘时机、预冷、冷藏条件、气调保鲜等。",
                publishDate: "2023-12-01",
                readCount: 1500
            },
            {
                id: 2,
                title: "沃柑智能分级与包装标准",
                type: "分级",
                summary: "介绍沃柑的等级划分、分级设备选择及包装材料应用。",
                publishDate: "2024-01-20",
                readCount: 1000
            }
        ]
    });
});

// 41.2 获取采后处理设备信息 (Get Post-Harvest Equipment Info)
router.get('/equipment', (req, res) => {
    const { type, brand } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "智能沃柑分选机",
                type: "分选机",
                brand: "某智能设备公司",
                capacity: "5吨/小时",
                features: ["按大小分级", "按颜色分级", "缺陷检测"],
                priceRange: "10-20万元",
                imageUrl: "url_to_image"
            }
        ]
    });
});

module.exports = router; 