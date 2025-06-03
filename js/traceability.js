// 产品溯源模块

// 模拟数据存储
let products = [];

// 自定义事件 - 产品数据更新
const PRODUCT_UPDATE_EVENT = 'productDataUpdate';

// 触发产品数据更新事件
function dispatchProductUpdate() {
  const event = new CustomEvent(PRODUCT_UPDATE_EVENT, {
    detail: { products: products }
  });
  window.dispatchEvent(event);
}

// 初始化溯源模块
export function initTraceability() {
  // 从localStorage加载数据
  loadProducts();
  
  // 初始化事件监听
  initEventListeners();
  
  // 更新统计数据
  updateStatistics();
  
  // 渲染产品列表
  renderProductList();
  
  // 更新产品选择下拉框
  updateProductSelect();
}

// 初始化事件监听
function initEventListeners() {
  // 添加产品表单提交
  const productForm = document.getElementById('productForm');
  if (productForm) {
    productForm.addEventListener('submit', handleProductSubmit);
  }
  
  // 生成二维码按钮点击
  const generateQRBtn = document.getElementById('generateQRBtn');
  if (generateQRBtn) {
    generateQRBtn.addEventListener('click', handleGenerateQR);
  }
  
  // 扫描二维码按钮点击
  const scanQRBtn = document.getElementById('scanQRBtn');
  if (scanQRBtn) {
    scanQRBtn.addEventListener('click', handleScanQR);
  }
}

// 显示添加产品模态框
function showAddProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// 隐藏添加产品模态框
function hideAddProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// 处理产品表单提交
function handleProductSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const product = {
    id: generateProductId(),
    name: formData.get('name'),
    category: formData.get('category'),
    specification: formData.get('specification'),
    productionDate: formData.get('productionDate'),
    batchNumber: formData.get('batchNumber'),
    producer: formData.get('producer'),
    description: formData.get('description'),
    createdAt: new Date().toISOString(),
    scanCount: 0
  };
  
  // 添加产品
  products.push(product);
  
  // 保存到localStorage
  saveProducts();
  
  // 触发产品数据更新事件
  dispatchProductUpdate();
  
  // 更新界面
  updateStatistics();
  renderProductList();
  updateProductSelect();
  
  // 关闭模态框
  hideAddProductModal();
  
  // 重置表单
  event.target.reset();
}

// 生成产品ID
function generateProductId() {
  return 'P' + Date.now().toString(36).toUpperCase();
}

// 处理生成二维码
function handleGenerateQR() {
  const productSelect = document.getElementById('productSelect');
  const productId = productSelect.value;
  
  if (!productId) {
    alert('请选择产品');
    return;
  }
  
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  const qrCodeDiv = document.getElementById('qrCode');
  qrCodeDiv.innerHTML = '';
  
  // 生成溯源信息URL
  const traceUrl = `${window.location.origin}/trace.html?id=${product.id}`;
  
  // 使用qrcode.js生成二维码
  QRCode.toCanvas(qrCodeDiv, traceUrl, { width: 200 }, function (error) {
    if (error) console.error(error);
  });
}

// 处理扫描二维码
function handleScanQR() {
  // TODO: 实现扫描二维码功能
  alert('扫描二维码功能开发中...');
}

// 渲染产品列表
function renderProductList() {
  const productList = document.getElementById('productList');
  if (!productList) return;
  
  productList.innerHTML = products.length ? '' : '<p class="text-gray-500 text-center py-4">暂无产品数据</p>';
  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-neutral rounded-lg p-4 card-hover';
    productCard.innerHTML = `
      <div class="flex items-start justify-between">
        <div>
          <h4 class="font-semibold text-lg mb-2">${product.name}</h4>
          <p class="text-gray-600 text-sm mb-2">批次号：${product.batchNumber}</p>
          <p class="text-gray-600 text-sm">生产日期：${new Date(product.productionDate).toLocaleDateString()}</p>
        </div>
        <span class="px-2 py-1 rounded-full text-xs ${getCategoryClass(product.category)}">
          ${product.category}
        </span>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
        <span class="text-sm text-gray-500">扫码次数：${product.scanCount}</span>
        <button onclick="viewProductDetail('${product.id}')" class="text-primary hover:text-primary/80 text-sm">
          查看详情
        </button>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

// 获取产品类别样式
function getCategoryClass(category) {
  const classes = {
    '沃柑': 'bg-secondary/20 text-secondary',
    '蜜橘': 'bg-primary/20 text-primary',
    '柑橘': 'bg-accent/20 text-accent'
  };
  return classes[category] || 'bg-gray-200 text-gray-600';
}

// 更新产品选择下拉框
function updateProductSelect() {
  const productSelect = document.getElementById('productSelect');
  if (!productSelect) return;
  
  // 清除现有选项
  productSelect.innerHTML = '<option value="">选择产品</option>';
  
  // 添加产品选项
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = `${product.name} (${product.batchNumber})`;
    productSelect.appendChild(option);
  });
}

// 更新统计数据
function updateStatistics() {
  // 更新已溯源产品数量
  const tracedProducts = document.getElementById('tracedProducts');
  if (tracedProducts) {
    tracedProducts.textContent = products.length;
  }
  
  // 更新本月新增数量
  const monthlyNew = document.getElementById('monthlyNew');
  if (monthlyNew) {
    const thisMonth = new Date().getMonth();
    const newCount = products.filter(p => {
      const productMonth = new Date(p.createdAt).getMonth();
      return productMonth === thisMonth;
    }).length;
    monthlyNew.textContent = newCount;
  }
  
  // 更新总扫码次数
  const scanCount = document.getElementById('scanCount');
  if (scanCount) {
    const totalScans = products.reduce((sum, p) => sum + p.scanCount, 0);
    scanCount.textContent = totalScans;
  }
}

// 查看产品详情
window.viewProductDetail = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  // TODO: 实现产品详情展示
  alert('产品详情功能开发中...');
};

// 显示添加产品模态框
window.showAddProductModal = function() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

// 隐藏添加产品模态框
window.hideAddProductModal = function() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }
};

// 从localStorage加载产品数据
function loadProducts() {
  const storedProducts = localStorage.getItem('traceProducts');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
  }
}

// 保存产品数据到localStorage
function saveProducts() {
  localStorage.setItem('traceProducts', JSON.stringify(products));
}