// 知识库数据
const knowledgeData = {
  planting: [
    {
      id: 'p1',
      title: '沃柑种植技术要点',
      content: `
# 沃柑种植技术要点

## 1. 选地与整地
- 选择排水良好、土层深厚的砂质壤土
- 土壤pH值以5.5-6.5为宜
- 进行深翻整地，深度40-50厘米

## 2. 定植技术
- 春季3-4月或秋季9-10月定植
- 株行距：4米×5米或5米×6米
- 挖60×60×50厘米的定植穴

## 3. 水肥管理
- 采用微喷灌溉系统
- 根据生长期调整浇水量
- 施用有机肥和复合肥

## 4. 整形修剪
- 采用开心形自然圆头形
- 定期疏除徒长枝、病虫枝
- 保持树冠通风透光
      `,
      category: 'planting',
      author: '农业专家',
      date: '2024-01-15',
      tags: ['种植技术', '沃柑', '果树管理']
    },
    {
      id: 'p2',
      title: '沃柑幼树管理指南',
      content: `
# 沃柑幼树管理指南

## 1. 土壤管理
- 保持土壤疏松，除草松土
- 树盘覆盖稻草或地膜
- 建立排水系统

## 2. 肥水管理
- 浅施多次，追肥为主
- 氮磷钾配比科学合理
- 适时适量灌溉

## 3. 整形修剪
- 及早确定主枝
- 控制树高，一般不超过3米
- 注意保持树形均衡

## 4. 病虫害防治
- 加强预防为主
- 发现病虫及时防治
- 选用高效低毒农药
      `,
      category: 'planting',
      author: '果树专家',
      date: '2024-01-16',
      tags: ['幼树管理', '沃柑', '栽培技术']
    }
  ],
  disease: [
    {
      id: 'd1',
      title: '沃柑常见病虫害防治',
      content: `
# 沃柑常见病虫害防治指南

## 1. 炭疽病
### 症状
- 果实出现圆形褐斑
- 病斑逐渐扩大、凹陷
- 严重时果实脱落

### 防治方法
- 清园治理
- 喷施波尔多液
- 使用专门杀菌剂

## 2. 红蜘蛛
### 症状
- 叶片失绿、发黄
- 叶背有小红点
- 严重影响光合作用

### 防治方法
- 加强水分管理
- 喷施专用杀螨剂
- 注意轮换用药
      `,
      category: 'disease',
      author: '植保专家',
      date: '2024-01-17',
      tags: ['病虫害', '防治', '植保']
    },
    {
      id: 'd2',
      title: '沃柑黄龙病防控技术',
      content: `
# 沃柑黄龙病防控技术

## 1. 病害特征
- 叶片黄化、斑驳
- 果实畸形、偏小
- 树势衰弱

## 2. 传播途径
- 木虱传播
- 嫁接传播
- 苗木带毒

## 3. 防控措施
- 选用无毒苗木
- 防治木虱
- 及时清除病株

## 4. 综合防治
- 建立防控体系
- 加强园区管理
- 开展统防统治
      `,
      category: 'disease',
      author: '植保专家',
      date: '2024-01-18',
      tags: ['黄龙病', '防控', '沃柑']
    }
  ],
  fertilizer: [
    {
      id: 'f1',
      title: '沃柑科学施肥指南',
      content: `
# 沃柑科学施肥指南

## 1. 基肥施用
- 有机肥为主
- 适量复合肥
- 深施于根系周围

## 2. 追肥技术
- 结合生长周期
- 氮磷钾合理配比
- 采用穴施或沟施

## 3. 叶面肥使用
- 选择微量元素肥
- 早晚喷施
- 注意浓度控制

## 4. 施肥注意事项
- 避免肥害
- 适时适量
- 讲究方法技巧
      `,
      category: 'fertilizer',
      author: '土肥专家',
      date: '2024-01-19',
      tags: ['施肥', '沃柑', '肥料管理']
    },
    {
      id: 'f2',
      title: '沃柑水肥一体化技术',
      content: `
# 沃柑水肥一体化技术

## 1. 系统组成
- 首部枢纽
- 管网系统
- 施肥装置

## 2. 肥料选择
- 水溶性好
- 养分全面
- 适合滴灌

## 3. 操作要点
- 合理分配
- 定时定量
- 注意浓度

## 4. 管理维护
- 定期冲洗
- 预防堵塞
- 及时维修
      `,
      category: 'fertilizer',
      author: '农艺师',
      date: '2024-01-20',
      tags: ['水肥一体化', '沃柑', '智能灌溉']
    }
  ]
};

// AI问答智能体配置
const aiConfig = {
  systemPrompt: '你是一个专业的沃柑种植顾问，可以回答关于沃柑种植、病虫害防治、施肥管理等方面的问题。',
  temperature: 0.7,
  maxTokens: 2000
};

// 初始化知识库
export function initKnowledge() {
  loadKnowledgeList();
  initSearch();
  initCategoryFilter();
  initLoadMore();
}

// 加载知识列表
function loadKnowledgeList(category = 'all', searchQuery = '') {
  const knowledgeList = document.getElementById('knowledgeList');
  let filteredData = [];

  // 根据分类和搜索词筛选数据
  if (category === 'all') {
    filteredData = [
      ...knowledgeData.planting,
      ...knowledgeData.disease,
      ...knowledgeData.fertilizer
    ];
  } else {
    filteredData = knowledgeData[category];
  }

  if (searchQuery) {
    filteredData = filteredData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 渲染知识卡片
  knowledgeList.innerHTML = filteredData.map(item => `
    <div class="bg-white rounded-xl shadow-md p-6 card-hover cursor-pointer" onclick="showKnowledgeDetail('${item.id}')">
      <div class="flex items-center justify-between mb-4">
        <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">${getCategoryName(item.category)}</span>
        <span class="text-sm text-gray-500">${item.date}</span>
      </div>
      <h3 class="text-xl font-semibold mb-2">${item.title}</h3>
      <p class="text-gray-600 line-clamp-3">${getContentPreview(item.content)}</p>
      <div class="flex items-center justify-between mt-4 pt-4 border-t">
        <div class="flex items-center space-x-2">
          <i class="fa fa-user-circle text-gray-400"></i>
          <span class="text-sm text-gray-600">${item.author}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          ${item.tags.map(tag => `
            <span class="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">#${tag}</span>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// 显示知识详情
export function showKnowledgeDetail(id) {
  let item;
  for (const category in knowledgeData) {
    const found = knowledgeData[category].find(i => i.id === id);
    if (found) {
      item = found;
      break;
    }
  }

  if (!item) return;

  const modal = document.getElementById('knowledgeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');

  modalTitle.textContent = item.title;
  modalContent.innerHTML = marked.parse(item.content);
  modal.classList.remove('hidden');
}

// 隐藏知识详情模态框
export function hideKnowledgeModal() {
  const modal = document.getElementById('knowledgeModal');
  modal.classList.add('hidden');
}

// 提交评论
export function submitComment() {
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');
  const comment = commentInput.value.trim();

  if (!comment) return;

  // 创建新评论
  const newComment = `
    <div class="bg-gray-50 rounded-lg p-4">
      <div class="flex items-center space-x-3 mb-2">
        <img src="https://picsum.photos/32/32" alt="用户头像" class="w-8 h-8 rounded-full">
        <div>
          <h4 class="font-semibold">访客用户</h4>
          <p class="text-sm text-gray-500">${new Date().toLocaleString()}</p>
        </div>
      </div>
      <p class="text-gray-700">${comment}</p>
    </div>
  `;

  commentsList.insertAdjacentHTML('afterbegin', newComment);
  commentInput.value = '';
}

// 初始化搜索功能
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  let debounceTimer;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const activeCategory = document.querySelector('.btn-primary.active').dataset.category;
      loadKnowledgeList(activeCategory, e.target.value);
    }, 300);
  });
}

// 初始化分类筛选
function initCategoryFilter() {
  const categoryButtons = document.querySelectorAll('[data-category]');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 更新按钮状态
      categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('opacity-60');
      });
      button.classList.add('active');
      button.classList.remove('opacity-60');

      // 重新加载列表
      const searchQuery = document.getElementById('searchInput').value;
      loadKnowledgeList(button.dataset.category, searchQuery);
    });
  });
}

// 初始化加载更多功能
function initLoadMore() {
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  loadMoreBtn.addEventListener('click', () => {
    // 这里可以实现分页加载逻辑
    console.log('加载更多...');
  });
}

// 辅助函数
function getCategoryName(category) {
  const categoryMap = {
    planting: '种植技术',
    disease: '病虫害防治',
    fertilizer: '施肥管理'
  };
  return categoryMap[category] || category;
}

function getContentPreview(content) {
  // 移除Markdown标记，只保留纯文本
  const plainText = content.replace(/[#*`-]/g, '').trim();
  return plainText.split('\n')[0]; // 返回第一段文字
}