const express = require('express');
const router = express.Router();

// 35.1 获取病虫害数据库 (Get Pest & Disease Database)
router.get('/database', (req, res) => {
    const { type, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                name: "柑橘黄龙病",
                type: "病害",
                symptoms: "叶片黄化，果实畸形，植株枯死。",
                prevention: "选用无病苗木，清除病株，防治木虱。",
                treatment: "目前无有效治疗方法，以预防为主。",
                imageUrl: "url_to_image"
            },
            {
                id: 2,
                name: "柑橘红蜘蛛",
                type: "虫害",
                symptoms: "叶片出现灰白色斑点，严重时落叶。",
                prevention: "加强果园管理，保护天敌。",
                treatment: "可使用阿维菌素、螺螨酯等农药防治。",
                recommendedPesticides: ["农药A", "农药B"]
            }
        ]
    });
});

// 35.2 提交病虫害报告 (Submit Pest & Disease Report)
router.post('/reports', (req, res) => {
    const { userId, orchardId, description, images, contactInfo } = req.body;
    res.json({
        code: 200,
        message: '病虫害报告已提交，请等待专家诊断',
        data: { reportId: "PDR20240527001" }
    });
});

// 35.3 获取病虫害诊断结果 (Get Pest & Disease Diagnosis Result)
router.get('/reports/:reportId/diagnosis', (req, res) => {
    const { reportId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            reportId: reportId,
            diagnosis: "初步判断为柑橘黄龙病，建议立即隔离病株，并加强园区内木虱的防治。",
            suggestedTreatment: "推荐使用生物防治与化学防治相结合的方案。",
            expertInfo: { name: "李博士", title: "植物保护专家" },
            diagnosisTime: "2024-05-27T17:00:00Z"
        }
    });
});

module.exports = router; 