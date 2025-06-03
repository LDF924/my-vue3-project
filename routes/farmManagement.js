const express = require('express');
const router = express.Router();

// 22.1 获取农事活动列表 (Get Farm Activities List)
router.get('/activities', (req, res) => {
    const { userId, dateRange, status } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                activityName: "沃柑施肥",
                date: "2024-03-15",
                orchardId: 101,
                description: "第三季沃柑追肥，使用复合肥。",
                status: "completed"
            },
            {
                id: 2,
                activityName: "病虫害巡查",
                date: "2024-05-30",
                orchardId: 101,
                description: "例行巡查，检查红蜘蛛发生情况。",
                status: "planned"
            }
        ]
    });
});

// 22.2 添加农事活动 (Add Farm Activity)
router.post('/activities', (req, res) => {
    const { userId, activityName, date, orchardId, description, status } = req.body;
    res.json({
        code: 200,
        message: '农事活动添加成功',
        data: { activityId: 3 }
    });
});

// 22.3 更新农事活动状态 (Update Farm Activity Status)
router.put('/activities/:activityId/status', (req, res) => {
    const { activityId } = req.params;
    const { status, completionDate, remark } = req.body;
    res.json({
        code: 200,
        message: '农事活动状态更新成功',
        data: null
    });
});

module.exports = router; 