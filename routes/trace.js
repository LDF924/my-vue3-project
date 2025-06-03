const express = require('express');
const router = express.Router();

// 49.1 查询产品溯源信息 (Query Product Traceability Info)
router.get('/products/:traceCode', (req, res) => {
    const { traceCode } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            traceCode: traceCode,
            productName: "武鸣沃柑",
            batchNumber: "BATCH20240520",
            origin: "广西南宁市武鸣区XX果园",
            plantingInfo: {
                farmerName: "李大爷",
                plantingDate: "2023-03-01",
                fertilizationRecords: ["2023-05-10 施肥记录"],
                pesticideRecords: ["2023-07-20 农药使用记录"]
            },
            harvestInfo: {
                harvestDate: "2024-01-15",
                harvestQuantity: "5000kg",
                operator: "采摘团队A"
            },
            processingInfo: {
                processDate: "2024-01-16",
                processType: "清洗、分级、包装",
                processor: "武鸣果品加工厂"
            },
            logisticsInfo: [
                {
                    stage: "采摘到仓库",
                    transportDate: "2024-01-15",
                    carrier: "自有运输",
                    temperature: "5-8℃"
                },
                {
                    stage: "仓库到市场",
                    transportDate: "2024-01-18",
                    carrier: "顺丰冷链",
                    trackingNumber: "SF123456789",
                    temperature: "3-6℃"
                }
            ],
            qualityInspection: {
                testDate: "2024-01-17",
                sugarContent: "14.5°Brix",
                pesticideResidue: "合格",
                inspector: "第三方检测机构"
            }
        }
    });
});

// 49.2 获取产品批次列表 (Get Product Batches List)
router.get('/batches', (req, res) => {
    const { productType, dateRange, origin } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                batchNumber: "BATCH20240520",
                productName: "武鸣沃柑",
                plantingDate: "2023-03-01",
                harvestDate: "2024-01-15",
                quantity: "5000kg",
                status: "已上市"
            }
        ]
    });
});

module.exports = router; 