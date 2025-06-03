const express = require('express');
const router = express.Router();

// 28.1 获取土地流转信息列表 (Get Land Transfer Listings)
router.get('/listings', (req, res) => {
    const { region, areaRange, type } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "武鸣XX村沃柑园土地出租",
                area: "50亩",
                pricePerMuPerYear: "800元",
                transferType: "出租",
                duration: "10年",
                location: "武鸣区XX村",
                contactInfo: "李先生 139...",
                description: "适合种植沃柑，配套水利设施完善。",
                publishDate: "2024-05-15"
            }
        ]
    });
});

// 28.2 发布土地流转信息 (Publish Land Transfer Listing)
router.post('/listings', (req, res) => {
    const { ownerId, title, area, price, transferType, location, contactInfo, description } = req.body;
    res.json({
        code: 200,
        message: '土地流转信息发布成功',
        data: { listingId: 101 }
    });
});

module.exports = router; 