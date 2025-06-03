const express = require('express');
const router = express.Router();

// 37.1 提交农药检测申请 (Submit Pesticide Test Application)
router.post('/applications', (req, res) => {
    const { applicantName, contactPhone, sampleType, sampleWeight, testingItems, deliveryMethod, address, remark } = req.body;
    res.json({
        code: 200,
        message: '农药检测申请已提交',
        data: { testApplicationId: 'PTAPP20240527001' }
    });
});

// 37.2 查询农药检测结果 (Query Pesticide Test Result)
router.get('/:testApplicationId/result', (req, res) => {
    const { testApplicationId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            testApplicationId: testApplicationId,
            sampleType: "沃柑",
            testDate: "2024-05-26",
            results: [
                { itemName: "百菌清", detectionValue: "0.01mg/kg", standardLimit: "0.1mg/kg", status: "合格" },
                { itemName: "多菌灵", detectionValue: "0.005mg/kg", standardLimit: "0.05mg/kg", status: "合格" }
            ],
            conclusion: "所检项目符合国家农药残留标准",
            reportUrl: "url_to_test_report.pdf",
            status: "已完成"
        }
    });
});

module.exports = router; 