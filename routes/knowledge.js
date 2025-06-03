const express = require('express');
const router = express.Router();

// 26.1 获取知识文章列表 (Get Knowledge Articles List)
router.get('/articles', (req, res) => {
    const { category, search, page, limit } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "沃柑常见病虫害防治手册",
                category: "病虫害防治",
                summary: "详细介绍了沃柑种植过程中常见的病虫害及其科学防治方法。",
                author: "李教授",
                publishDate: "2023-11-01",
                readCount: 1500,
                imageUrl: "url_to_thumbnail"
            },
            {
                id: 2,
                title: "如何科学施肥提升沃柑品质",
                category: "种植技术",
                summary: "从土壤分析到不同生长阶段的施肥策略，全面指导沃柑施肥。",
                author: "王专家",
                publishDate: "2024-01-10",
                readCount: 2300,
                imageUrl: "url_to_thumbnail"
            }
        ]
    });
});

// 26.2 获取知识文章详情 (Get Knowledge Article Details)
router.get('/articles/:articleId', (req, res) => {
    const { articleId } = req.params;
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            id: parseInt(articleId),
            title: "沃柑常见病虫害防治手册",
            category: "病虫害防治",
            content: "<p><b>红蜘蛛防治：</b>...</p><p><b>黄龙病预警：</b>...</p>",
            author: "李教授",
            publishDate: "2023-11-01",
            readCount: 1501,
            attachments: [
                { name: "红蜘蛛防治图解.pdf", url: "url_to_pdf" }
            ]
        }
    });
});

// 26.3 搜索知识文章 (Search Knowledge Articles)
router.get('/search', (req, res) => {
    const { query, category, page, limit } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "沃柑常见病虫害防治手册",
                category: "病虫害防治",
                summary: "详细介绍了沃柑种植过程中常见的病虫害及其科学防治方法。",
                author: "李教授",
                publishDate: "2023-11-01",
                readCount: 1500,
                imageUrl: "url_to_thumbnail"
            }
        ]
    });
});

module.exports = router; 