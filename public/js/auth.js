// 用户认证状态管理
let currentUser = null;

// 检查登录状态
function checkAuth() {
  const token = localStorage.getItem('token');
  return !!token;
}

// 获取当前用户信息
function getCurrentUser() {
  return currentUser;
}

// 显示登录模态框
function showLoginModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">登录</h3>
        <button onclick="closeModal(this)" class="text-gray-400 hover:text-gray-600">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <form id="loginForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <input type="text" name="username" required
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input type="password" name="password" required
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div class="flex justify-between items-center">
          <label class="flex items-center">
            <input type="checkbox" class="rounded border-gray-300 text-primary focus:ring-primary">
            <span class="ml-2 text-sm text-gray-600">记住我</span>
          </label>
          <button type="button" onclick="showRegisterModal()" class="text-sm text-primary hover:text-primary/80">注册账号</button>
        </div>
        <button type="submit" class="w-full btn-primary mt-4">登录</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // 设置表单提交事件
  const form = document.getElementById('loginForm');
  form.onsubmit = handleLogin;
}

// 显示注册模态框
function showRegisterModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
    <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">注册</h3>
        <button onclick="closeModal(this)" class="text-gray-400 hover:text-gray-600">
          <i class="fa fa-times"></i>
        </button>
      </div>
      <form id="registerForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
          <input type="text" name="username" required
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
          <input type="email" name="email" required
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
          <input type="password" name="password" required
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
          <input type="password" name="confirmPassword" required
            class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50">
        </div>
        <div class="flex justify-end">
          <button type="button" onclick="showLoginModal()" class="text-sm text-primary hover:text-primary/80">已有账号？去登录</button>
        </div>
        <button type="submit" class="w-full btn-primary mt-4">注册</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // 设置表单提交事件
  const form = document.getElementById('registerForm');
  form.onsubmit = handleRegister;
}

// 处理登录表单提交
async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.username.value;
  const password = form.password.value;

  try {
    showLoading();
    const data = await api.auth.login({ username, password });
    localStorage.setItem('token', data.token);
    currentUser = data.user;
    closeModal(form);
    showSuccess('登录成功');
    window.location.reload(); // 刷新页面以更新状态
  } catch (error) {
    showError('登录失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 处理注册表单提交
async function handleRegister(event) {
  event.preventDefault();
  const form = event.target;
  const username = form.username.value;
  const email = form.email.value;
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  if (password !== confirmPassword) {
    showError('两次输入的密码不一致');
    return;
  }

  try {
    showLoading();
    const data = await api.auth.register({ username, email, password });
    localStorage.setItem('token', data.token);
    currentUser = data.user;
    closeModal(form);
    showSuccess('注册成功');
    window.location.reload(); // 刷新页面以更新状态
  } catch (error) {
    showError('注册失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 登出
function logout() {
  localStorage.removeItem('token');
  currentUser = null;
  window.location.reload(); // 刷新页面以更新状态
}

// 工具函数
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