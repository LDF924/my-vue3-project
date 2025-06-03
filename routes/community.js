const express = require('express');
const router = express.Router();

// 15.1 获取社区数据统计 (Get Community Statistics)
router.get('/stats', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: {
            discussions: 1234,
            techPosts: 567,
            marketInfo: 345,
            helpPosts: 210,
            totalPosts: 2356,
            activeUsers: 526,
            todayPosts: 45
        }
    });
});

// 15.2 获取热门标签 (Get Popular Tags)
router.get('/tags/popular', (req, res) => {
    res.json({
        code: 200,
        message: '获取成功',
        data: ["种植技术", "病虫害防治", "市场行情", "果园管理", "品质提升"]
    });
});

// 15.3 获取帖子列表 (Get Posts List)
router.get('/posts', (req, res) => {
    const { page, limit, sortBy, tag, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "分享一下我的沃柑种植经验",
                content: "今年的沃柑长势特别好，主要得益于以下几点：...",
                author: { "id": 101, "name": "果农老王", "avatar": "url_to_avatar" },
                publishTime: "2小时前",
                likes: 88,
                comments: 36,
                shares: 10,
                images: ["url_to_img1", "url_to_img2"],
                tags: ["种植技术"]
            }
        ]
    });
});

// 15.4 发布帖子 (Create Post)
router.post('/posts', (req, res) => {
    const { authorId, title, content, images, tags } = req.body;
    res.json({
        code: 200,
        message: '帖子发布成功',
        data: { postId: 201 }
    });
});

// 15.5 提交回答 (Submit Answer)
router.post('/posts/:postId/answers', (req, res) => {
    const { postId } = req.params;
    const { authorId, content, title, images } = req.body;
    res.json({
        code: 200,
        message: '回答提交成功',
        data: { answerId: 301 }
    });
});

// 15.6 点赞帖子/回答 (Like Post/Answer)
router.post('/posts/:postId/like', (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    res.json({
        code: 200,
        message: '点赞成功',
        data: { likesCount: 89 }
    });
});

router.post('/answers/:answerId/like', (req, res) => {
    const { answerId } = req.params;
    const { userId } = req.body;
    res.json({
        code: 200,
        message: '点赞成功',
        data: { likesCount: 89 }
    });
});

// 15.7 获取行业问答列表 (Get Industry Q&A List)
router.get('/qa', (req, res) => {
    const { page, limit, sortBy, tag, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                question: "如何提高沃柑品质？",
                category: "种植技术",
                content: "分享下提高沃柑品质的关键技术要点...",
                answersCount: 15,
                likesCount: 28,
                favoritesCount: 12,
                author: { "id": 106, "name": "张三" },
                publishTime: "2024-05-25"
            }
        ]
    });
});

// 15.8 加载更多 (Load More) - Covered by 15.3 and 15.7 with pagination parameters.

module.exports = router; 