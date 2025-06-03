// 用户认证状态管理
const AUTH_TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';
const USER_TYPE_KEY = 'user_type';

// 模拟用户数据（实际项目中应该从后端获取）
const mockUsers = [
  {
    id: 1,
    username: '果农老王',
    password: '123456',
    avatar: 'https://picsum.photos/40/40',
    role: 'farmer'
  },
  {
    id: 2,
    username: '果园小张',
    password: '123456',
    avatar: 'https://picsum.photos/42/42',
    role: 'farmer'
  },
  {
    id: 3,
    username: '专家李教授',
    password: '123456',
    avatar: 'https://picsum.photos/44/44',
    role: 'expert'
  }
];

// 登录函数
async function login(username, password) {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 查找用户
  const user = mockUsers.find(u => u.username === username && u.password === password);
  
  if (user) {
    // 生成模拟token
    const token = btoa(JSON.stringify({ userId: user.id, timestamp: Date.now() }));
    
    // 保存认证信息
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_INFO_KEY, JSON.stringify({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      role: user.role
    }));
    
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        role: user.role
      }
    };
  }
  
  return {
    success: false,
    message: '用户名或密码错误'
  };
}

// 退出登录
function logout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
}

// 检查是否已登录
function checkAuth() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!token;
}

// 获取当前登录用户信息
function getCurrentUser() {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
}

// 显示身份验证模态框
function showAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// 隐藏身份验证模态框
function hideAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// 确认用户身份类型
function confirmUserType() {
  const selectedType = document.querySelector('input[name="userType"]:checked');
  if (selectedType) {
    // 保存用户身份到本地存储
    localStorage.setItem(USER_TYPE_KEY, selectedType.value);
    hideAuthModal();
  } else {
    alert('请选择您的身份类型');
  }
}

// 初始化身份验证模态框事件监听
function initAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    // 点击遮罩层关闭模态框
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) {
        hideAuthModal();
      }
    });
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initAuthModal);

// 导出函数
window.auth = {
  login,
  logout,
  checkAuth,
  getCurrentUser,
  showAuthModal,
  hideAuthModal,
  confirmUserType
};