const express = require('express');
const router = express.Router();

// 10.1 报名线下品鉴会 (Register for Offline Tasting Event)
router.post('/events/register', (req, res) => {
    const { eventName, participantName, contactInfo, companyName } = req.body;
    res.json({
        code: 200,
        message: '报名成功',
        data: null
    });
});

// 10.2 申请采购商评级 (Apply for Buyer Rating)
router.post('/ratings/apply', (req, res) => {
    const { companyName, contactPerson, contactPhone, annualPurchaseVolume, otherDocuments } = req.body;
    res.json({
        code: 200,
        message: '评级申请已提交，请等待审核',
        data: null
    });
});

// 10.3 获取俱乐部数据看板数据 (Get Buyers Club Dashboard Data)
router.get('/dashboard', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            buyersCount: 1500,
            annualPurchase: "50000吨",
            activityCount: 12,
            levelDist: { "AAA": 50, "AA": 100, "A": 300, "Other": 1050 },
            statTotalPurchase: 180000,
            statMembers: 1500,
            statActive: 800,
            statEvents: 12
        }
    });
});

// 10.4 发布采购需求 (Publish Purchase Requirement)
router.post('/purchase-requirements', (req, res) => {
    const { buyerId, productName, quantity, qualityRequirements, deliveryDate, contactInfo, remark } = req.body;
    res.json({
        code: 200,
        message: '采购需求发布成功',
        data: { requirementId: "PRQ20240527001" }
    });
});

// 10.5 报名专属活动 (Register for Exclusive Activity)
router.post('/activities/register', (req, res) => {
    const { activityId, userId, name, phone } = req.body;
    res.json({
        code: 200,
        message: '活动报名成功',
        data: null
    });
});

// 10.6 申请采购评级 (Submit Purchase Rating Application)
router.post('/ratings/submit', (req, res) => {
    const { userId, applicationDetails } = req.body;
    res.json({
        code: 200,
        message: '评级申请已提交，审核中',
        data: null
    });
});

module.exports = router; 