// 搜索和筛选功能模块

// 帖子数据（模拟数据，实际项目中应从后端获取）
let posts = [
  {
    id: 1,
    title: '分享一下我的沃柑种植经验',
    content: '今年的沃柑长势特别好，主要得益于以下几点：1. 合理施肥，采用有机肥为主，配合适量的复合肥；2. 科学修剪，保持树冠通风透光；3. 及时防治病虫害，特别是在萌芽期和果实膨大期...',
    author: '果农老王',
    time: '2小时前',
    likes: 88,
    comments: 36,
    images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/301', 'https://picsum.photos/400/302']
  },
  {
    id: 2,
    title: '关于沃柑黄龙病防治的几点建议',
    content: '最近收到多位果农咨询黄龙病防治问题，在此分享一些专业建议：1. 选用抗病砧木；2. 定期检查，早发现早处理；3. 加强园区卫生，及时清除病株；4. 科学用药，注意防治木虱...',
    author: '技术专家李工',
    time: '4小时前',
    likes: 156,
    comments: 52
  },
  {
    id: 3,
    title: '今年的沃柑市场行情分析',
    content: '根据最近的市场调研，今年沃柑的市场需求持续走强，尤其是优质果，价格比去年同期上涨15%左右。主要原因是：1. 品质提升带来品牌效应；2. 电商渠道拓展顺利；3. 消费者认可度提高...',
    author: '果园小张',
    time: '6小时前',
    likes: 92,
    comments: 28
  }
];

// 当前排序方式
let currentSort = 'latest';

// 初始化搜索和筛选功能
export function initCommunitySearch() {
  const searchInput = document.querySelector('input[placeholder="搜索帖子..."]');
  const sortButtons = document.querySelectorAll('.bg-white.rounded-xl.shadow-md.p-4.flex button');
  
  // 搜索功能
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filterPosts(searchTerm);
  });
  
  // 排序功能
  sortButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // 移除所有按钮的高亮样式
      sortButtons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
        btn.classList.add('hover:bg-gray-100');
      });
      
      // 添加当前按钮的高亮样式
      e.target.classList.add('bg-primary', 'text-white');
      e.target.classList.remove('hover:bg-gray-100');
      
      // 更新排序方式并重新渲染
      const sortType = e.target.textContent.trim();
      sortPosts(sortType);
    });
  });
}

// 过滤帖子
function filterPosts(searchTerm) {
  const filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(searchTerm) ||
           post.content.toLowerCase().includes(searchTerm) ||
           post.author.toLowerCase().includes(searchTerm);
  });
  
  renderPosts(filteredPosts);
}

// 排序帖子
function sortPosts(sortType) {
  currentSort = sortType;
  let sortedPosts = [...posts];
  
  switch (sortType) {
    case '最新发布':
      // 按时间排序（这里使用模拟数据，实际项目中应该使用真实的时间戳）
      sortedPosts = sortedPosts.sort((a, b) => b.id - a.id);
      break;
    case '最多回复':
      sortedPosts = sortedPosts.sort((a, b) => b.comments - a.comments);
      break;
    case '最多点赞':
      sortedPosts = sortedPosts.sort((a, b) => b.likes - a.likes);
      break;
  }
  
  renderPosts(sortedPosts);
}

// 渲染帖子列表
function renderPosts(postsToRender) {
  const postsContainer = document.querySelector('.md\\:col-span-2 .space-y-6');
  
  // 清空现有帖子
  while (postsContainer.firstChild) {
    postsContainer.removeChild(postsContainer.firstChild);
  }
  
  // 渲染帖子
  postsToRender.forEach(post => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

// 创建帖子元素
function createPostElement(post) {
  const postDiv = document.createElement('div');
  postDiv.className = 'bg-white rounded-xl shadow-md p-6 card-hover';
  
  // 构建帖子HTML结构
  postDiv.innerHTML = `
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <img src="https://picsum.photos/40/40" alt="用户头像" class="w-10 h-10 rounded-full">
        <div>
          <h3 class="font-semibold">${post.author}</h3>
          <p class="text-sm text-gray-500">${post.time}</p>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <i class="fa fa-ellipsis-v"></i>
      </button>
    </div>
    <div class="mt-4">
      <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
      <p class="text-gray-600 line-clamp-3">${post.content}</p>
      ${post.images ? `
        <div class="grid grid-cols-3 gap-2 mt-4">
          ${post.images.map(img => `
            <img src="${img}" alt="帖子图片" class="rounded-lg w-full h-32 object-cover">
          `).join('')}
        </div>
      ` : ''}
    </div>
    <div class="flex items-center space-x-6 mt-4 pt-4 border-t">
      <button class="text-gray-500 hover:text-primary flex items-center space-x-2">
        <i class="fa fa-thumbs-up"></i>
        <span>${post.likes}</span>
      </button>
      <button class="text-gray-500 hover:text-primary flex items-center space-x-2">
        <i class="fa fa-comment"></i>
        <span>${post.comments}</span>
      </button>
      <button class="text-gray-500 hover:text-primary flex items-center space-x-2">
        <i class="fa fa-share"></i>
        <span>分享</span>
      </button>
    </div>
  `;
  
  return postDiv;
}