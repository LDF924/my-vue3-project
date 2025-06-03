const express = require('express');
const router = express.Router();

// 39.1 获取种植指南列表 (Get Planting Guides List)
router.get('/guides', (req, res) => {
    const { stage, type, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "沃柑幼树管理技术要点",
                stage: "幼树期",
                type: "文章",
                summary: "详细介绍幼树修剪、水肥管理、病虫害防治等。",
                author: "专家团队",
                publishDate: "2023-10-10",
                readCount: 800,
                coverImage: "url_to_image"
            },
            {
                id: 2,
                title: "沃柑春季施肥视频教程",
                stage: "开花期",
                type: "视频",
                summary: "视频演示春季沃柑施肥的正确方法和注意事项。",
                author: "农技站",
                publishDate: "2024-03-01",
                readCount: 1200,
                videoUrl: "url_to_video"
            }
        ]
    });
});

// 39.2 获取种植指南详情 (Get Planting Guide Details)
router.get('/guides/:guideId', (req, res) => {
    const { guideId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            id: parseInt(guideId),
            title: "沃柑幼树管理技术要点",
            content: "<p><b>修剪：</b>...", // HTML 或 Markdown 内容
            attachments: [
                { name: "幼树管理图解.pdf", url: "url_to_pdf" }
            ]
        }
    });
});

module.exports = router; 