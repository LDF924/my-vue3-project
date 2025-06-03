// 社区功能模块

// 用户身份验证状态管理
const AUTH_TYPE_KEY = 'user_auth_type';

// 检查用户是否已完成身份认证
export function checkUserAuthType() {
  return localStorage.getItem(AUTH_TYPE_KEY);
}

// 保存用户身份类型
export function saveUserAuthType(type) {
  localStorage.setItem(AUTH_TYPE_KEY, type);
}

// 显示身份验证模态框
export function showAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

// 隐藏身份验证模态框
export function hideAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// 确认用户身份类型
export function confirmUserType() {
  const selectedType = document.querySelector('input[name="userType"]:checked');
  if (!selectedType) {
    alert('请选择您的身份类型');
    return;
  }
  
  saveUserAuthType(selectedType.value);
  hideAuthModal();
  // 身份验证完成后，继续执行原有的回答操作
  proceedToAnswer();
}

// 检查身份并处理回答操作
export function handleAnswer() {
  const authType = checkUserAuthType();
  if (!authType) {
    showAuthModal();
    return;
  }
  proceedToAnswer();
}

// 执行回答操作
function proceedToAnswer() {
  // TODO: 实现具体的回答功能
  console.log('用户开始回答');
  // 这里可以添加显示回答编辑器等具体实现
}

// 初始化社区功能
export function initCommunity() {
  // 为所有回答按钮添加事件监听
  const answerButtons = document.querySelectorAll('[data-action="answer"]');
  answerButtons.forEach(button => {
    button.addEventListener('click', handleAnswer);
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initCommunity);