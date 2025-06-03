// 金融服务模块
import { createModal } from './modal.js';

// 初始化金融服务页面
export function initFinanceService() {
  // 检查用户登录状态
  checkAuthStatus();
  // 初始化表单验证
  initFormValidation();
  // 初始化移动端菜单
  initMobileMenu();
}

// 检查用户登录状态
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (!isLoggedIn) {
    // 未登录时跳转到登录页面
    window.location.href = 'index.html';
  }
}

// 初始化表单验证
function initFormValidation() {
  const consultForm = document.querySelector('form');
  if (consultForm) {
    consultForm.addEventListener('submit', handleConsultSubmit);
    
    // 添加输入验证
    const inputs = consultForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', validateInput);
    });
  }
}

// 验证输入
function validateInput(event) {
  const input = event.target;
  const value = input.value.trim();
  
  if (!value) {
    input.classList.add('border-red-500');
    input.classList.remove('border-gray-300');
  } else {
    input.classList.remove('border-red-500');
    input.classList.add('border-gray-300');
  }
}

// 初始化移动端菜单
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'md:hidden fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-50';
  mobileMenu.innerHTML = `
    <div class="h-full flex flex-col">
      <div class="flex items-center justify-between p-4 border-b">
        <span class="text-lg font-bold text-primary">菜单导航</span>
        <button class="text-dark" onclick="this.closest('.fixed').classList.add('translate-x-full')">
          <i class="fa fa-times text-xl"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto py-4">
        <div class="flex flex-col space-y-4 px-4">
          <a href="index.html" class="text-dark hover:text-primary font-medium py-2 flex items-center">
            <i class="fa fa-home w-8"></i>首页
          </a>
          <a href="dashboard.html" class="text-dark hover:text-primary font-medium py-2 flex items-center">
            <i class="fa fa-chart-bar w-8"></i>数据看板
          </a>
          <a href="farm-management.html" class="text-dark hover:text-primary font-medium py-2 flex items-center">
            <i class="fa fa-calendar w-8"></i>农事管理
          </a>
          <a href="trace.html" class="text-dark hover:text-primary font-medium py-2 flex items-center">
            <i class="fa fa-qrcode w-8"></i>产品溯源
          </a>
          <a href="finance.html" class="text-primary font-medium py-2 flex items-center">
            <i class="fa fa-money-bill w-8"></i>金融服务
          </a>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(mobileMenu);
  
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
  }
  
  // 点击遮罩层关闭菜单
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.add('translate-x-full');
    }
  });
}

// 处理咨询表单提交
async function handleConsultSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const submitButton = event.target.querySelector('button[type="submit"]');
  
  try {
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i>提交中...';
    
    // TODO: 实现表单提交逻辑
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API请求
    
    alert('咨询提交成功，我们将尽快与您联系！');
    event.target.reset();
  } catch (error) {
    console.error('提交失败：', error);
    alert('提交失败，请稍后重试');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = '提交咨询';
  }
}

// 显示贷款申请模态框
window.showLoanModal = function() {
  const content = `
    <form class="space-y-4" onsubmit="handleLoanSubmit(event)">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">申请人姓名</label>
        <input type="text" name="name" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="请输入姓名">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
        <input type="tel" name="phone" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="请输入手机号">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">贷款金额</label>
        <input type="number" name="amount" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="请输入贷款金额">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">贷款用途</label>
        <textarea name="purpose" required class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50 h-32" placeholder="请说明贷款用途"></textarea>
      </div>
      <button type="submit" class="btn-primary w-full">提交申请</button>
    </form>
  `;
  createModal('贷款申请', content);
}

// 显示保险服务模态框
window.showInsuranceModal = function() {
  const content = `
    <div class="space-y-4">
      <div class="p-4 bg-neutral rounded-lg">
        <h4 class="font-medium mb-2">自然灾害保险</h4>
        <p class="text-gray-600">覆盖台风、暴雨、冰雹等自然灾害造成的损失</p>
        <button onclick="applyInsurance('natural')" class="btn-primary mt-2">立即投保</button>
      </div>
      <div class="p-4 bg-neutral rounded-lg">
        <h4 class="font-medium mb-2">病虫害保险</h4>
        <p class="text-gray-600">覆盖主要病虫害造成的产量损失</p>
        <button onclick="applyInsurance('pest')" class="btn-primary mt-2">立即投保</button>
      </div>
      <div class="p-4 bg-neutral rounded-lg">
        <h4 class="font-medium mb-2">价格保险</h4>
        <p class="text-gray-600">保障市场价格波动带来的收益损失</p>
        <button onclick="applyInsurance('price')" class="btn-primary mt-2">立即投保</button>
      </div>
    </div>
  `;
  createModal('保险服务', content);
}

// 显示补贴政策模态框
window.showSubsidyModal = function() {
  const content = `
    <div class="space-y-4">
      <div class="mb-4">
        <input type="text" id="subsidySearch" class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="搜索补贴政策" onkeyup="searchSubsidy(this.value)">
      </div>
      <div id="subsidyList" class="space-y-4">
        <div class="p-4 bg-neutral rounded-lg">
          <h4 class="font-medium mb-2">种植补贴</h4>
          <p class="text-gray-600">符合条件的沃柑种植户可申请每亩500元补贴</p>
          <button onclick="applySubsidy('planting')" class="btn-primary mt-2">申请补贴</button>
        </div>
        <div class="p-4 bg-neutral rounded-lg">
          <h4 class="font-medium mb-2">农机补贴</h4>
          <p class="text-gray-600">购买农机具最高可享受30%补贴</p>
          <button onclick="applySubsidy('machine')" class="btn-primary mt-2">申请补贴</button>
        </div>
      </div>
    </div>
  `;
  createModal('补贴政策', content);
}

// 处理贷款申请提交
window.handleLoanSubmit = function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  // TODO: 实现贷款申请提交逻辑
  alert('贷款申请已提交，我们将尽快审核！');
  closeModal(event.target.closest('.fixed').querySelector('.fa-times'));
}

// 申请保险
window.applyInsurance = function(type) {
  // TODO: 实现保险申请逻辑
  alert('保险申请已提交，我们将尽快处理！');
}

// 搜索补贴政策
window.searchSubsidy = function(keyword) {
  // TODO: 实现补贴政策搜索逻辑
  console.log('搜索补贴政策：', keyword);
}

// 申请补贴
window.applySubsidy = function(type) {
  // TODO: 实现补贴申请逻辑
  alert('补贴申请已提交，我们将尽快处理！');
}