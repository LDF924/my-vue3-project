// 电子书数据
const ebooksData = [
    {
        id: 1,
        title: '沃柑高效栽培技术手册',
        description: '详细介绍沃柑栽培的各个节节，图文并茂，实用性强',
        publisher: '农业出版社',
        version: '2024年版',
        rating: 4.0,
        downloads: 2156,
        coverImage: 'https://via.placeholder.com/400x250',
        downloadUrl: '#'
    }
    // 可以添加更多电子书数据
];

// 渲染电子书卡片
function renderEbooks() {
    const container = document.querySelector('.grid');
    container.innerHTML = ebooksData.map(book => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <img src="${book.coverImage}" alt="${book.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">${book.title}</h2>
                <p class="text-gray-600 mb-4">${book.description}</p>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">${book.publisher}</span>
                    <span class="text-sm text-gray-500">${book.version}</span>
                </div>
                <div class="mt-4 flex items-center">
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span class="ml-1 text-sm text-gray-500">${book.rating}</span>
                    </div>
                    <span class="mx-2 text-gray-300">|</span>
                    <span class="text-sm text-gray-500">${book.downloads}次下载</span>
                </div>
                <a href="${book.downloadUrl}" class="mt-4 block w-full bg-blue-500 text-white text-center py-2 rounded-md hover:bg-blue-600 transition duration-300" onclick="handleDownload(${book.id})">免费下载</a>
            </div>
        </div>
    `).join('');
}

// 处理下载事件
function handleDownload(bookId) {
    const book = ebooksData.find(b => b.id === bookId);
    if (book) {
        // 这里可以添加下载逻辑
        console.log(`开始下载：${book.title}`);
        // 可以添加下载计数器更新逻辑
    }
}

// 页面加载完成后渲染电子书
document.addEventListener('DOMContentLoaded', renderEbooks);