const express = require('express');
const router = express.Router();

// 19.1 获取电子图书列表 (Get Ebook List)
router.get('/', (req, res) => {
    const { page, limit, search } = req.query;
    res.json({
        code: 200,
        message: '获取成功',
        data: [
            {
                id: 1,
                title: "沃柑高效栽培技术手册",
                description: "详细介绍沃柑栽培的各个节节，图文并茂，实用性强",
                publisher: "农业出版社",
                publishYear: "2024年版",
                rating: 4.0,
                downloadCount: 2156,
                coverImage: "https://via.placeholder.com/400x250",
                downloadUrl: "/api/ebooks/1/download"
            }
        ]
    });
});

// 19.2 下载电子图书 (Download Ebook)
router.get('/:ebookId/download', (req, res) => {
    const { ebookId } = req.params;
    // 实际业务逻辑：提供文件下载
    // 这里只是一个模拟，实际应用中需要根据 ebookId 找到文件路径并使用 res.download() 或 res.sendFile()
    res.status(200).send(`Downloading ebook ${ebookId}. This is a placeholder for file download.`);
});

// 19.3 记录下载次数 (Record Download Count)
router.post('/:ebookId/download-count', (req, res) => {
    const { ebookId } = req.params;
    const { increment } = req.body;
    // 实际业务逻辑：更新下载次数
    res.json({
        code: 200,
        message: '下载次数已更新',
        data: { newCount: 2157 } // 模拟更新后的数量
    });
});

module.exports = router; 