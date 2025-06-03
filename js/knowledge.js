// 知识库数据
const knowledgeData = [
  {
    id: 1,
    title: '沃柑种植技术要点',
    category: 'planting',
    content: `
      <h2>选择适宜种植区域</h2>
      <p>沃柑适宜在年平均气温18-22℃、年降水量1000-1600mm的地区种植。土壤以pH值5.5-6.5的砂质壤土为佳。</p>
      
      <h2>整地与定植</h2>
      <ul>
        <li>定植前深翻土地40-50cm，每亩施入有机肥2000-3000kg</li>
        <li>株行距以5×6m或6×7m为宜</li>
        <li>定植时间最佳在春季2-3月份或秋季9-10月份</li>
      </ul>
      
      <h2>水肥管理</h2>
      <p>沃柑对水分要求较高，应保持土壤湿润但不积水。生长季节注意及时灌溉，干旱季节应采取相应的保水措施。</p>
    `,
    author: {
      name: '李农技',
      avatar: 'https://picsum.photos/40/40',
      title: '高级农艺师'
    },
    createdAt: '2024-01-15',
    likes: 156,
    comments: 23
  },
  {
    id: 5,
    title: '沃柑果实品质提升技术',
    category: 'planting',
    content: `
      <h2>果实品质影响因素</h2>
      <p>沃柑果实品质的优劣直接影响经济效益，主要受以下因素影响：</p>
      
      <ul>
        <li>光照与温度条件</li>
        <li>水分供应情况</li>
        <li>土壤肥力水平</li>
        <li>果实养分分配</li>
      </ul>
      
      <h2>提升措施</h2>
      <p>通过科学管理提高果实品质：</p>
      
      <ul>
        <li>合理疏果：保持适宜的果叶比</li>
        <li>科学套袋：改善果实外观</li>
        <li>适时采收：把握最佳采摘期</li>
      </ul>
    `,
    author: {
      name: '林品质',
      avatar: 'https://picsum.photos/40/44',
      title: '果品专家'
    },
    createdAt: '2024-01-19',
    likes: 86,
    comments: 9
  },
  {
    id: 6,
    title: '沃柑土壤改良技术',
    category: 'fertilizer',
    content: `
      <h2>土壤问题诊断</h2>
      <p>常见的土壤问题包括：酸化、板结、养分失衡等。</p>
      
      <h3>改良方法：</h3>
      <ul>
        <li>施用石灰：调节土壤pH值</li>
        <li>增施有机肥：改善土壤结构</li>
        <li>种植绿肥：增加土壤有机质</li>
      </ul>
      
      <h2>持续改良措施</h2>
      <p>土壤改良是一个持续的过程，需要：</p>
      
      <ul>
        <li>定期检测土壤性质</li>
        <li>合理轮作与间作</li>
        <li>适时深耕与翻土</li>
      </ul>
    `,
    author: {
      name: '赵土壤',
      avatar: 'https://picsum.photos/40/45',
      title: '土壤专家'
    },
    createdAt: '2024-01-20',
    likes: 76,
    comments: 8
  },
  {
    id: 7,
    title: '沃柑采后处理技术',
    category: 'planting',
    content: `
      <h2>采收标准</h2>
      <p>科学的采收对保证果实品质至关重要：</p>
      
      <ul>
        <li>果实达到适宜大小</li>
        <li>果皮色泽均匀</li>
        <li>糖酸比达标</li>
      </ul>
      
      <h2>贮藏保鲜</h2>
      <p>采后处理的关键环节：</p>
      
      <ul>
        <li>预冷处理：降低呼吸强度</li>
        <li>分级包装：按品质分类</li>
        <li>冷链运输：保持品质</li>
      </ul>
    `,
    author: {
      name: '黄采收',
      avatar: 'https://picsum.photos/40/46',
      title: '采后处理专家'
    },
    createdAt: '2024-01-21',
    likes: 65,
    comments: 7
  },
  
  {
    id: 1,
    title: '沃柑种植技术要点',
    category: 'planting',
    content: `
      <h2>选择适宜种植区域</h2>
      <p>沃柑适宜在年平均气温18-22℃、年降水量1000-1600mm的地区种植。土壤以pH值5.5-6.5的砂质壤土为佳。</p>
      
      <h2>整地与定植</h2>
      <ul>
        <li>定植前深翻土地40-50cm，每亩施入有机肥2000-3000kg</li>
        <li>株行距以5×6m或6×7m为宜</li>
        <li>定植时间最佳在春季2-3月份或秋季9-10月份</li>
      </ul>
      
      <h2>水肥管理</h2>
      <p>沃柑对水分要求较高，应保持土壤湿润但不积水。生长季节注意及时灌溉，干旱季节应采取相应的保水措施。</p>
    `,
    author: {
      name: '李农技',
      avatar: 'https://picsum.photos/40/40',
      title: '高级农艺师'
    },
    createdAt: '2024-01-15',
    likes: 156,
    comments: 23
  },
  {
    id: 2,
    title: '沃柑常见病虫害防治指南',
    category: 'disease',
    content: `
      <h2>柑橘黄龙病防治</h2>
      <p>黄龙病是沃柑最严重的病害之一，主要表现为叶片黄化、果实畸形等症状。</p>
      
      <h3>防治措施：</h3>
      <ul>
        <li>选用无病苗木</li>
        <li>及时清除病株</li>
        <li>加强柑橘木虱防治</li>
        <li>增施有机肥，提高树势</li>
      </ul>
      
      <h2>沃柑红蜘蛛防治</h2>
      <p>在干旱、高温季节多发，可造成叶片失绿、早衰。</p>
      
      <h3>防治方法：</h3>
      <ul>
        <li>加强水分管理，增加空气湿度</li>
        <li>喷施生物农药或化学农药防治</li>
      </ul>
    `,
    author: {
      name: '王植保',
      avatar: 'https://picsum.photos/40/41',
      title: '植保专家'
    },
    createdAt: '2024-01-16',
    likes: 142,
    comments: 18
  },
  {
    id: 3,
    title: '沃柑科学施肥技术',
    category: 'fertilizer',
    content: `
      <h2>基肥施用</h2>
      <p>基肥是沃柑生长的重要养分来源，应在冬季或早春施用。</p>
      
      <h3>施肥量参考：</h3>
      <ul>
        <li>有机肥：50-80kg/株</li>
        <li>复合肥：2-3kg/株</li>
      </ul>
      
      <h2>追肥管理</h2>
      <p>全年追肥3-4次，主要在萌芽期、开花期、果实膨大期施用。</p>
      
      <h3>注意事项：</h3>
      <ul>
        <li>雨前或灌水前施肥效果好</li>
        <li>干旱时节应先灌水后施肥</li>
        <li>氮肥施用要适量，避免徒长</li>
      </ul>
    `,
    author: {
      name: '张土肥',
      avatar: 'https://picsum.photos/40/42',
      title: '土肥研究员'
    },
    createdAt: '2024-01-17',
    likes: 128,
    comments: 15
  }
];

// 导出所有需要的函数
export { initKnowledge, showKnowledgeModal, hideKnowledgeModal, submitComment };

// 初始化知识库
function initKnowledge() {
  // 加载知识列表
  loadKnowledgeList();
  
  // 绑定搜索事件
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', debounce(handleSearch, 300));
  
  // 绑定分类筛选事件
  const categoryButtons = document.querySelectorAll('button[data-category]');
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => handleCategoryFilter(button.dataset.category));
  });
  
  // 绑定加载更多事件
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.addEventListener('click', handleLoadMore);
}

// 加载知识列表
function loadKnowledgeList(category = 'all', searchText = '') {
  const knowledgeList = document.getElementById('knowledgeList');
  
  // 筛选数据
  let filteredData = knowledgeData;
  if (category !== 'all') {
    filteredData = filteredData.filter(item => item.category === category);
  }
  if (searchText) {
    filteredData = filteredData.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.content.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
  // 渲染列表
  knowledgeList.innerHTML = filteredData.map(item => `
    <div class="bg-white rounded-xl shadow-md p-4 md:p-5 card-hover cursor-pointer mb-4 md:mb-5 transform transition-transform hover:scale-102" onclick="showKnowledgeModal(${item.id})">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center space-x-3">
          <img src="${item.author.avatar}" alt="作者头像" class="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover">
          <div>
            <h3 class="font-semibold">${item.author.name}</h3>
            <p class="text-sm text-gray-500">${item.author.title}</p>
          </div>
        </div>
        <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
          ${getCategoryLabel(item.category)}
        </span>
      </div>
      
      <h2 class="text-lg md:text-xl font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">${item.title}</h2>
      <p class="text-gray-600 text-sm md:text-base line-clamp-3 mb-3">${stripHtml(item.content)}</p>
      
      <div class="flex items-center justify-between pt-3 border-t border-gray-100">
        <div class="flex items-center space-x-4">
          <span class="text-gray-500">
            <i class="fa fa-calendar mr-2"></i>${item.createdAt}
          </span>
          <span class="text-gray-500">
            <i class="fa fa-thumbs-up mr-2"></i>${item.likes}
          </span>
          <span class="text-gray-500">
            <i class="fa fa-comment mr-2"></i>${item.comments}
          </span>
        </div>
        <button class="text-primary hover:text-primary/80 transition-colors">
          查看详情
          <i class="fa fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// 处理搜索
function handleSearch(event) {
  const searchText = event.target.value.trim();
  loadKnowledgeList(getCurrentCategory(), searchText);
}

// 处理分类筛选
function handleCategoryFilter(category) {
  // 更新按钮状态
  const buttons = document.querySelectorAll('button[data-category]');
  buttons.forEach(button => {
    if (button.dataset.category === category) {
      button.classList.remove('opacity-60');
      button.classList.add('active');
    } else {
      button.classList.add('opacity-60');
      button.classList.remove('active');
    }
  });
  
  // 重新加载列表
  loadKnowledgeList(category, getCurrentSearchText());
}

// 处理加载更多
function handleLoadMore() {
  // TODO: 实现分页加载
  console.log('加载更多...');
}

// 获取当前分类
function getCurrentCategory() {
  const activeButton = document.querySelector('button[data-category].active');
  return activeButton ? activeButton.dataset.category : 'all';
}

// 获取当前搜索文本
function getCurrentSearchText() {
  return document.getElementById('searchInput').value.trim();
}

// 获取分类标签文本
function getCategoryLabel(category) {
  const labels = {
    planting: '种植技术',
    disease: '病虫害防治',
    fertilizer: '施肥管理'
  };
  return labels[category] || '其他';
}

// 去除HTML标签
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

// 防抖函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 更新全局函数
window.showKnowledgeModal = function(id) {
  const knowledge = knowledgeData.find(item => item.id === id);
  if (!knowledge) return;
  
  // 更新模态框内容
  document.getElementById('modalTitle').textContent = knowledge.title;
  document.getElementById('modalContent').innerHTML = knowledge.content;
  
  // 显示模态框
  const modal = document.getElementById('knowledgeModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.hideKnowledgeModal = function() {
  const modal = document.getElementById('knowledgeModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

window.submitComment = function() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value.trim();
  if (!comment) return;
  
  // TODO: 提交评论到后端
  console.log('提交评论:', comment);
  
  // 清空输入框
  commentInput.value = '';
};