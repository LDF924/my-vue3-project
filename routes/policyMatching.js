const express = require('express');
const router = express.Router();

// 40.1 获取政策列表 (Get Policy List)
router.get('/policies', (req, res) => {
    const { type, region, search, status } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "2024年武鸣区沃柑产业发展补贴政策",
                type: "补贴",
                region: "武鸣区",
                publishDate: "2024-01-01",
                deadline: "2024-12-31",
                summary: "针对沃柑种植户的财政补贴政策，鼓励优质高产。",
                eligibility: "武鸣区内注册的沃柑种植合作社或规模化种植户。"
            },
            {
                id: 2,
                title: "农业科技创新项目申报指南",
                type: "技术推广",
                region: "广西全省",
                publishDate: "2024-03-15",
                summary: "支持农业科技创新和成果转化项目。"
            }
        ]
    });
});

// 40.2 提交政策匹配需求 (Submit Policy Matching Request)
router.post('/policy-matching/requests', (req, res) => {
    const { userId, userProfile } = req.body;
    res.json({
        code: 200,
        message: '政策匹配请求已提交，系统正在为您匹配...',
        data: { matchingRequestId: "PMREQ20240527001" }
    });
});

// 40.3 获取政策匹配结果 (Get Policy Matching Result)
router.get('/policy-matching/requests/:matchingRequestId/results', (req, res) => {
    const { matchingRequestId } = req.params;
    res.json({
        code: 200,
        message: '匹配结果已生成',
        data: {
            matchingRequestId: matchingRequestId,
            matchedPolicies: [
                {
                    policyId: 1,
                    title: "2024年武鸣区沃柑产业发展补贴政策",
                    matchScore: 95,
                    reason: "您是武鸣区沃柑合作社，符合补贴对象条件，且种植面积符合要求。"
                }
            ],
            unmatchedReason: "部分政策因种植规模不足或地区不符而未匹配。",
            recommendations: "建议您关注其他地区政策或考虑扩大种植规模以符合更多政策。"
        }
    });
});

module.exports = router; 