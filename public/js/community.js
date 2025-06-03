// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initializePage();
  checkUserAuthStatus();
});

// 页面初始化
async function initializePage() {
  await loadPosts();
  setupEventListeners();
}

// 加载帖子列表
async function loadPosts(params = {}) {
  try {
    showLoading();
    const data = await api.post.getPosts(params);
    renderPosts(data.posts);
    updatePagination(data);
  } catch (error) {
    showError('加载帖子失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 渲染帖子列表
function renderPosts(posts) {
  const postsContainer = document.querySelector('.space-y-6');
  postsContainer.innerHTML = posts.map(post => `
    <div class="bg-white rounded-xl shadow-md p-6 card-hover cursor-pointer" onclick="showPostDetail('${post._id}')">
      <div class="flex items-start justify-between">
        <div class="flex items-center space-x-3">
          <img src="${post.author.avatar || 'https://picsum.photos/40/40'}" alt="用户头像" class="w-10 h-10 rounded-full">
          <div>
            <h3 class="font-semibold">${post.author.username}</h3>
            <p class="text-sm text-gray-500">${post.author.userType ? getUserTypeDisplay(post.author.userType) : ''}</p>
            <p class="text-sm text-gray-500">${formatTime(post.createdAt)}</p>
          </div>
        </div>
        ${post.author._id === getCurrentUserId() ? `
          <div class="relative group">
            <button class="text-gray-400 hover:text-gray-600" onclick="showPostOptions(event, '${post._id}')">
              <i class="fa fa-ellipsis-v"></i>
            </button>
          </div>
        ` : ''}
      </div>
      <div class="mt-4">
        <h2 class="text-xl font-semibold mb-2">${post.title}</h2>
        <p class="text-gray-600 line-clamp-3">${post.content}</p>
        ${post.images.length > 0 ? `
          <div class="grid grid-cols-${Math.min(post.images.length, 3)} gap-2 mt-4">
            ${post.images.map(image => `
              <img src="${image}" alt="帖子图片" class="rounded-lg w-full h-32 object-cover">
            `).join('')}
          </div>
        ` : ''}
        ${post.tags.length > 0 ? `
          <div class="flex flex-wrap gap-2 mt-4">
            ${post.tags.map(tag => `
              <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">#${tag}</span>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="flex items-center space-x-6 mt-4 pt-4 border-t">
        <button onclick="toggleLike('${post._id}')" class="text-gray-500 hover:text-primary flex items-center space-x-2 ${post.likes.includes(getCurrentUserId()) ? 'text-primary' : ''}">
          <i class="fa fa-thumbs-up"></i>
          <span>${post.likes.length}</span>
        </button>
        <button onclick="showComments('${post._id}')" class="text-gray-500 hover:text-primary flex items-center space-x-2">
          <i class="fa fa-comment"></i>
          <span>${post.comments.length}</span>
        </button>
        <button onclick="sharePost('${post._id}')" class="text-gray-500 hover:text-primary flex items-center space-x-2">
          <i class="fa fa-share"></i>
          <span>分享</span>
        </button>
      </div>
    </div>
  `).join('');
}

// 显示发帖模态框
function showPostModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">发布新帖子</h3>
        <button onclick="closeModal(this)" class="text-gray-400 hover:text-gray-600">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <form id="postForm" class="space-y-4">
        <div>
          <input type="text" placeholder="标题" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" required>
        </div>
        <div>
          <textarea placeholder="分享你的想法..." class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32" required></textarea>
        </div>
        <div>
          <input type="text" placeholder="添加标签（用逗号分隔）" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">添加图片</label>
          <input type="file" accept="image/*" multiple class="w-full" id="imageInput">
          <div id="imagePreview" class="grid grid-cols-3 gap-2 mt-2"></div>
        </div>
        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" onclick="closeModal(this)" class="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">取消</button>
          <button type="submit" class="btn-primary">发布</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // 设置表单提交事件
  const form = document.getElementById('postForm');
  form.onsubmit = handlePostSubmit;

  // 设置图片预览
  const imageInput = document.getElementById('imageInput');
  imageInput.onchange = handleImagePreview;
}

// 处理发帖表单提交
async function handlePostSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const title = form.querySelector('input[type="text"]').value;
  const content = form.querySelector('textarea').value;
  const tagsInput = form.querySelectorAll('input[type="text"]')[1].value;
  const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);
  const imageFiles = form.querySelector('input[type="file"]').files;

  try {
    showLoading();
    await api.post.createPost({
      title,
      content,
      tags,
      images: Array.from(imageFiles)
    });
    closeModal(form);
    await loadPosts();
    showSuccess('发布成功');
  } catch (error) {
    showError('发布失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 处理图片预览
function handleImagePreview(event) {
  const preview = document.getElementById('imagePreview');
  preview.innerHTML = '';
  const files = event.target.files;

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = document.createElement('img');
      img.src = e.target.result;
      img.className = 'w-full h-24 object-cover rounded-lg';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
}

// 点赞/取消点赞
async function toggleLike(postId) {
  try {
    const data = await api.post.toggleLike(postId);
    await loadPosts(); // 重新加载帖子列表以更新点赞状态
  } catch (error) {
    if (error.message.includes('认证')) {
      showLoginModal();
    } else {
      showError('操作失败：' + error.message);
    }
  }
}

// 显示评论
async function showComments(postId) {
  try {
    const post = await api.post.getPostDetail(postId);
    showCommentsModal(post);
  } catch (error) {
    showError('加载评论失败：' + error.message);
  }
}

// 显示帖子详情
async function showPostDetail(postId) {
  try {
    const post = await api.post.getPostDetail(postId);
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">帖子详情</h3>
          <button onclick="closeModal(this)" class="text-gray-400 hover:text-gray-600">
            <i class="fa fa-times"></i>
          </button>
        </div>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <img src="${post.author.avatar || 'https://picsum.photos/40/40'}" alt="用户头像" class="w-10 h-10 rounded-full">
            <div>
              <h3 class="font-semibold">${post.author.username}</h3>
              <p class="text-sm text-gray-500">${formatTime(post.createdAt)}</p>
            </div>
          </div>
          <h2 class="text-2xl font-semibold">${post.title}</h2>
          <p class="text-gray-600 whitespace-pre-wrap">${post.content}</p>
          ${post.images.length > 0 ? `
            <div class="grid grid-cols-${Math.min(post.images.length, 3)} gap-2">
              ${post.images.map(image => `
                <img src="${image}" alt="帖子图片" class="rounded-lg w-full h-48 object-cover cursor-pointer" onclick="showFullImage('${image}')">
              `).join('')}
            </div>
          ` : ''}
          ${post.tags.length > 0 ? `
            <div class="flex flex-wrap gap-2">
              ${post.tags.map(tag => `
                <span class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">#${tag}</span>
              `).join('')}
            </div>
          ` : ''}
          <div class="flex items-center space-x-6 pt-4 border-t">
            <button onclick="toggleLike('${post._id}')" class="text-gray-500 hover:text-primary flex items-center space-x-2 ${post.likes.includes(getCurrentUserId()) ? 'text-primary' : ''}">
              <i class="fa fa-thumbs-up"></i>
              <span>${post.likes.length}</span>
            </button>
            <button onclick="showComments('${post._id}')" class="text-gray-500 hover:text-primary flex items-center space-x-2">
              <i class="fa fa-comment"></i>
              <span>${post.comments.length}</span>
            </button>
            <button onclick="sharePost('${post._id}')" class="text-gray-500 hover:text-primary flex items-center space-x-2">
              <i class="fa fa-share"></i>
              <span>分享</span>
            </button>
          </div>
          <div class="pt-4 border-t">
            <h4 class="text-lg font-semibold mb-2">参与问答</h4>
            <form onsubmit="handleAnswerSubmit(event, '${post._id}')" class="space-y-4">
              <div>
                <textarea placeholder="写下你的回答..." class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32" required></textarea>
              </div>
              <div class="flex justify-end">
                <button type="submit" class="btn-primary">提交回答</button>
              </div>
            </form>
          </div>
          ${post.answers && post.answers.length > 0 ? `
            <div class="pt-4 border-t">
              <h4 class="text-lg font-semibold mb-4">全部回答 (${post.answers.length})</h4>
              <div class="space-y-4">
                ${post.answers.map(answer => `
                  <div class="bg-gray-50 rounded-lg p-4">
                    <div class="flex items-center space-x-3 mb-2">
                      <img src="${answer.user.avatar || 'https://picsum.photos/40/40'}" alt="用户头像" class="w-8 h-8 rounded-full">
                      <div>
                        <h5 class="font-medium">${answer.user.username}</h5>
                        <p class="text-sm text-gray-500">${formatTime(answer.createdAt)}</p>
                      </div>
                    </div>
                    <p class="text-gray-600 whitespace-pre-wrap">${answer.content}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  } catch (error) {
    showError('加载帖子详情失败：' + error.message);
  }
}

// 显示大图
function showFullImage(imageUrl) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
  modal.innerHTML = `
    <button onclick="closeModal(this)" class="absolute top-4 right-4 text-white hover:text-gray-300">
      <i class="fa fa-times text-2xl"></i>
    </button>
    <img src="${imageUrl}" alt="大图" class="max-w-[90vw] max-h-[90vh] object-contain">
  `;
  document.body.appendChild(modal);
}

// 显示评论模态框
function showCommentsModal(post) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">评论</h3>
        <button onclick="closeModal(this)" class="text-gray-400 hover:text-gray-600">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <div class="space-y-4">
        ${post.comments.map(comment => `
          <div class="flex space-x-3">
            <img src="${comment.user.avatar || 'https://picsum.photos/40/40'}" alt="用户头像" class="w-8 h-8 rounded-full">
            <div class="flex-1">
              <div class="bg-gray-50 rounded-lg p-3">
                <div class="font-medium">${comment.user.username}</div>
                <p class="text-gray-600">${comment.content}</p>
              </div>
              <div class="text-sm text-gray-500 mt-1">${formatTime(comment.createdAt)}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <form onsubmit="handleCommentSubmit(event, '${post._id}')" class="mt-4 pt-4 border-t">
        <div class="flex space-x-2">
          <input type="text" placeholder="写下你的评论..." class="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" required>
          <button type="submit" class="btn-primary">发送</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

// 处理评论提交
async function handleCommentSubmit(event, postId) {
  event.preventDefault();
  const content = event.target.querySelector('input').value;

  try {
    await api.post.addComment(postId, content);
    const post = await api.post.getPostDetail(postId);
    const modal = event.target.closest('.fixed');
    modal.remove();
    showCommentsModal(post);
  } catch (error) {
    if (error.message.includes('认证')) {
      showLoginModal();
    } else {
      showError('评论失败：' + error.message);
    }
  }
}

// 处理回答提交
async function handleAnswerSubmit(event, postId) {
  event.preventDefault();
  const content = event.target.querySelector('textarea').value;

  try {
    showLoading();
    await api.post.addAnswer(postId, content);
    const post = await api.post.getPostDetail(postId);
    const modal = event.target.closest('.fixed');
    modal.remove();
    showPostDetail(postId);
    showSuccess('回答发布成功');
  } catch (error) {
    if (error.message.includes('认证')) {
      showLoginModal();
    } else {
      showError('回答发布失败：' + error.message);
    }
  } finally {
    hideLoading();
  }
}

// 分享帖子
function sharePost(postId) {
  const url = `${window.location.origin}/community.html?post=${postId}`;
  if (navigator.share) {
    navigator.share({
      title: '分享帖子',
      url: url
    });
  } else {
    navigator.clipboard.writeText(url)
      .then(() => showSuccess('链接已复制到剪贴板'))
      .catch(() => showError('复制链接失败'));
  }
}

// 显示帖子操作选项
function showPostOptions(event, postId) {
  event.stopPropagation();
  const button = event.target.closest('button');
  const options = document.createElement('div');
  options.className = 'absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10';
  options.innerHTML = `
    <button onclick="editPost('${postId}')" class="w-full text-left px-4 py-2 hover:bg-gray-100">
      <i class="fa fa-edit mr-2"></i>编辑
    </button>
    <button onclick="deletePost('${postId}')" class="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
      <i class="fa fa-trash mr-2"></i>删除
    </button>
  `;
  
  // 移除其他选项菜单
  document.querySelectorAll('.post-options').forEach(el => el.remove());
  options.classList.add('post-options');
  button.parentNode.appendChild(options);

  // 点击其他区域关闭选项菜单
  document.addEventListener('click', function closeOptions(e) {
    if (!options.contains(e.target) && !button.contains(e.target)) {
      options.remove();
      document.removeEventListener('click', closeOptions);
    }
  });
}

// 编辑帖子
async function editPost(postId) {
  try {
    const post = await api.post.getPostDetail(postId);
    showEditModal(post);
  } catch (error) {
    showError('加载帖子失败：' + error.message);
  }
}

// 显示编辑模态框
function showEditModal(post) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">编辑帖子</h3>
        <button onclick="closeModal(this)" class="text-gray-400 hover:text-gray-600">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <form onsubmit="handleEditSubmit(event, '${post._id}')" class="space-y-4">
        <div>
          <input type="text" value="${post.title}" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50" required>
        </div>
        <div>
          <textarea class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32" required>${post.content}</textarea>
        </div>
        <div>
          <input type="text" value="${post.tags.join(', ')}" class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div class="flex justify-end space-x-2 pt-4">
          <button type="button" onclick="closeModal(this)" class="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">取消</button>
          <button type="submit" class="btn-primary">保存</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(modal);
}

// 处理编辑提交
async function handleEditSubmit(event, postId) {
  event.preventDefault();
  const form = event.target;
  const title = form.querySelector('input[type="text"]').value;
  const content = form.querySelector('textarea').value;
  const tagsInput = form.querySelectorAll('input[type="text"]')[1].value;
  const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);

  try {
    showLoading();
    await api.post.updatePost(postId, { title, content, tags });
    closeModal(form);
    await loadPosts();
    showSuccess('更新成功');
  } catch (error) {
    showError('更新失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 删除帖子
async function deletePost(postId) {
  if (!confirm('确定要删除这个帖子吗？')) return;

  try {
    showLoading();
    await api.post.deletePost(postId);
    await loadPosts();
    showSuccess('删除成功');
  } catch (error) {
    showError('删除失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 工具函数
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  if (diff < 2592000000) return `${Math.floor(diff / 86400000)}天前`;
  return date.toLocaleDateString();
}

function getCurrentUserId() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  } catch (error) {
    return null;
  }
}

function getUserTypeDisplay(userType) {
  const userTypeMap = {
    student: '高校相关专业学生',
    teacher: '高校相关专业老师',
    ecommerce: '电商公司',
    coop: '农业合作社',
    store: '农资超市老板',
    market: '水果市场摊贩',
    company: '沃柑生产企业负责人',
    agri_bureau: '农业局',
    research: '农业研究所',
    village: '村委',
    bank: '银行',
    farmer: '沃柑种植户',
    consumer: '消费者'
  };
  return userTypeMap[userType] || '';
}

function closeModal(element) {
  const modal = element.closest('.fixed');
  modal.remove();
}

function showLoading() {
  // 实现加载提示
}

function hideLoading() {
  // 隐藏加载提示
}

function showError(message) {
  alert(message); // 可以替换为更好的提示UI
}

function showSuccess(message) {
  alert(message); // 可以替换为更好的提示UI
}

function showLoginModal() {
  // 实现登录模态框
  alert('请先登录');
}

// 设置事件监听器
function setupEventListeners() {
  // 排序按钮点击事件
  document.querySelectorAll('.bg-white button').forEach(button => {
    button.addEventListener('click', () => {
      const sort = button.textContent === '最新发布' ? '-createdAt' :
                   button.textContent === '最多回复' ? '-commentCount' :
                   button.textContent === '最多点赞' ? '-likeCount' : '-createdAt';
      loadPosts({ sort });
    });
  });

  // 搜索输入事件
  const searchInput = document.querySelector('input[placeholder="搜索帖子..."]');
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const query = e.target.value.trim();
      if (query) {
        loadPosts({ search: query });
      } else {
        loadPosts();
      }
    }, 500);
  });
}