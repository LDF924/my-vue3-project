// 用户身份验证相关功能

// 显示用户身份验证模态框
function showAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.remove('hidden');
  }
}

// 隐藏用户身份验证模态框
function hideAuthModal() {
  const authModal = document.getElementById('authModal');
  if (authModal) {
    authModal.classList.add('hidden');
  }
}

// 确认用户身份选择
async function confirmUserType() {
  const selectedType = document.querySelector('input[name="userType"]:checked');
  if (!selectedType) {
    showError('请选择您的身份');
    return;
  }

  try {
    showLoading();
    // 调用API更新用户身份信息
    await api.user.updateUserType(selectedType.value);
    hideAuthModal();
    showSuccess('身份验证成功');
    // 刷新用户信息
    await refreshUserInfo();
  } catch (error) {
    showError('身份验证失败：' + error.message);
  } finally {
    hideLoading();
  }
}

// 检查用户身份验证状态
async function checkUserAuthStatus() {
  try {
    const userInfo = await api.user.getCurrentUser();
    if (!userInfo.userType) {
      showAuthModal();
    }
    return userInfo.userType;
  } catch (error) {
    console.error('获取用户身份信息失败：', error);
    return null;
  }
}

// 刷新用户信息
async function refreshUserInfo() {
  try {
    const userInfo = await api.user.getCurrentUser();
    // 更新用户信息显示
    updateUserInfoDisplay(userInfo);
  } catch (error) {
    console.error('刷新用户信息失败：', error);
  }
}

// 更新用户信息显示
function updateUserInfoDisplay(userInfo) {
  const userTypeDisplay = document.getElementById('userTypeDisplay');
  if (userTypeDisplay && userInfo.userType) {
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
    userTypeDisplay.textContent = userTypeMap[userInfo.userType] || '未知身份';
  }
}

// 页面加载完成后检查用户身份验证状态
document.addEventListener('DOMContentLoaded', () => {
  checkUserAuthStatus();
});