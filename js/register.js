// 注册相关功能

// 显示注册模态框
function showRegisterModal() {
  const loginModal = document.getElementById('loginModal');
  loginModal.classList.add('hidden');
  // TODO: 实现注册模态框显示逻辑
  alert('注册功能即将上线，敬请期待！');
}

// 导出函数
window.register = {
  showRegisterModal
};