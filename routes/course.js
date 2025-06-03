const express = require('express');
const router = express.Router();

// 17.1 获取课程详情 (Get Course Details)
router.get('/:courseId', (req, res) => {
    const { courseId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            id: parseInt(courseId),
            title: "沃柑种植基础技术",
            description: "从选地建园到幼树管理，全面掌握沃柑种植基础知识",
            instructor: { "name": "李教授", "title": "农业专家", "avatar": "url_to_instructor_avatar" },
            duration: "45分钟",
            studentsCount: 1234,
            rating: 4.8,
            image: "url_to_course_cover",
            chapters: [
                {
                    "title": "第1章：沃柑种植概述",
                    "duration": "15分钟",
                    "lessons": [
                        { "title": "1.1 沃柑品种特性介绍", "duration": "5分钟", "videoUrl": "url_to_video1" }
                    ]
                }
            ],
            materials: [
                { "name": "沃柑种植技术要点.pdf", "url": "url_to_pdf", "type": "pdf" }
            ]
        }
    });
});

// 17.2 获取课程评论 (Get Course Comments)
router.get('/:courseId/comments', (req, res) => {
    const { courseId } = req.params;
    const { page, limit } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 101,
                content: "请问老师，沃柑幼树定植后需要多久才能挂果？",
                author: { "id": 201, "name": "张三", "avatar": "url_to_user_avatar" },
                publishTime: "2小时前",
                replies: []
            }
        ]
    });
});

// 17.3 提交评论 (Submit Comment)
router.post('/:courseId/comments', (req, res) => {
    const { courseId } = req.params;
    const { authorId, content } = req.body;
    res.json({
        code: 200,
        message: '评论发表成功',
        data: { commentId: 102 }
    });
});

// 17.4 更新学习进度 (Update Learning Progress)
router.put('/users/:userId/courses/:courseId/progress', (req, res) => {
    const { userId, courseId } = req.params;
    const { completedLessons, totalProgress } = req.body;
    res.json({
        code: 200,
        message: '学习进度更新成功',
        data: null
    });
});

module.exports = router; 