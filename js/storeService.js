// 农资超市服务模块

// 购物车数据
let cart = [];

// 初始化农资超市功能
export function initStoreService() {
  console.log('初始化农资超市服务...');
  
  // 加载购物车数据
  loadCart();
  
  // 绑定立即购买按钮事件
  bindBuyButtons();
  
  // 更新购物车计数
  updateCartCount();
}

// 绑定所有立即购买按钮的点击事件
function bindBuyButtons() {
  // 使用原生JS方法选择农资超市部分的所有按钮
  const allButtons = document.querySelectorAll('#agri-store .card-hover button');
  
  // 遍历所有按钮，找到文本为"立即购买"的按钮并绑定事件
  allButtons.forEach(button => {
    if (button.textContent.trim() === '立即购买') {
      button.addEventListener('click', handleBuyButtonClick);
    }
  });
  
  // 更新所有购物车计数显示
  updateAllCartCounters();
}

// 处理立即购买按钮点击
function handleBuyButtonClick(event) {
  const button = event.currentTarget;
  const productCard = button.closest('.card-hover');
  
  if (!productCard) return;
  
  // 获取产品信息
  const productName = productCard.querySelector('h3').textContent;
  const productPrice = productCard.querySelector('.text-lg.font-bold').textContent;
  const productImage = productCard.querySelector('img').src;
  const productCategory = productCard.querySelector('.absolute.top-3.left-3 span').textContent;
  
  // 创建产品对象
  const product = {
    id: generateProductId(),
    name: productName,
    price: productPrice,
    image: productImage,
    category: productCategory,
    quantity: 1
  };
  
  // 添加到购物车
  addToCart(product);
  
  // 显示添加成功提示
  showAddToCartNotification(product);
}

// 添加商品到购物车
function addToCart(product) {
  // 检查购物车中是否已存在该商品
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    // 如果已存在，增加数量
    existingProduct.quantity += 1;
  } else {
    // 如果不存在，添加到购物车
    cart.push(product);
  }
  
  // 保存购物车数据
  saveCart();
  
  // 更新购物车计数
  updateCartCount();
}

// 从购物车移除商品
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
}

// 更新购物车中商品数量
function updateProductQuantity(productId, quantity) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = Math.max(1, quantity);
    saveCart();
  }
}

// 保存购物车数据到本地存储
function saveCart() {
  localStorage.setItem('agriStoreCart', JSON.stringify(cart));
}

// 从本地存储加载购物车数据
function loadCart() {
  const savedCart = localStorage.getItem('agriStoreCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// 更新购物车计数显示
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // 如果页面上有购物车计数元素，则更新它
  const cartCountElement = document.getElementById('cartCount');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
  }
  
  // 更新所有购物车计数器
  updateAllCartCounters();
}

// 更新所有购物车计数器
function updateAllCartCounters() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  // 更新所有购物车计数元素
  const cartCountElements = document.querySelectorAll('.cartCount');
  cartCountElements.forEach(element => {
    element.textContent = cartCount;
    element.style.display = cartCount > 0 ? 'flex' : 'none';
  });
}

// 显示添加到购物车的通知
function showAddToCartNotification(product) {
  // 检查是否已存在通知容器
  let notificationContainer = document.getElementById('cartNotification');
  
  // 如果不存在，创建一个
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.id = 'cartNotification';
    notificationContainer.className = 'fixed bottom-4 right-4 z-50';
    document.body.appendChild(notificationContainer);
  }
  
  // 创建通知元素
  const notification = document.createElement('div');
  notification.className = 'bg-white rounded-lg shadow-lg p-4 mb-3 flex items-center transform translate-x-full transition-transform duration-300 max-w-md';
  notification.innerHTML = `
    <div class="w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
      <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
    </div>
    <div class="flex-1">
      <h4 class="font-medium text-gray-800">${product.name}</h4>
      <p class="text-sm text-gray-600">已添加到购物车</p>
    </div>
    <button class="ml-2 text-gray-400 hover:text-gray-600" onclick="this.parentElement.remove()">
      <i class="fa fa-times"></i>
    </button>
  `;
  
  // 添加到容器
  notificationContainer.appendChild(notification);
  
  // 显示通知（添加动画）
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 10);
  
  // 3秒后自动关闭
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// 生成唯一产品ID
function generateProductId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// 显示购物车
export function showCart() {
  // 创建购物车模态框
  const cartModal = document.createElement('div');
  cartModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  cartModal.id = 'cartModal';
  
  // 计算总价
  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
    return total + (price * item.quantity);
  }, 0);
  
  // 购物车内容
  cartModal.innerHTML = `
    <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
      <div class="p-6 flex items-center justify-between border-b">
        <h3 class="text-xl font-bold">购物车</h3>
        <button class="text-gray-400 hover:text-gray-600" onclick="document.getElementById('cartModal').remove()">
          <i class="fa fa-times"></i>
        </button>
      </div>
      
      <div class="p-6 overflow-y-auto max-h-[50vh]">
        ${cart.length === 0 ? '<p class="text-center text-gray-500 py-8">购物车为空</p>' : ''}
        ${cart.map(item => `
          <div class="flex items-center py-4 border-b last:border-0">
            <div class="w-16 h-16 rounded-lg overflow-hidden mr-4">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1">
              <h4 class="font-medium">${item.name}</h4>
              <p class="text-sm text-gray-500">${item.category}</p>
              <p class="text-primary font-bold">${item.price}</p>
            </div>
            <div class="flex items-center">
              <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" onclick="window.storeService.updateQuantity('${item.id}', ${item.quantity - 1})">
                <i class="fa fa-minus"></i>
              </button>
              <span class="mx-3">${item.quantity}</span>
              <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" onclick="window.storeService.updateQuantity('${item.id}', ${item.quantity + 1})">
                <i class="fa fa-plus"></i>
              </button>
            </div>
            <button class="ml-4 text-red-500 hover:text-red-700" onclick="window.storeService.removeItem('${item.id}')">
              <i class="fa fa-trash"></i>
            </button>
          </div>
        `).join('')}
      </div>
      
      <div class="p-6 border-t bg-gray-50">
        <div class="flex items-center justify-between mb-4">
          <span class="text-lg font-medium">总计:</span>
          <span class="text-xl font-bold text-primary">¥${totalPrice.toFixed(2)}</span>
        </div>
        <div class="flex space-x-4">
          <button class="flex-1 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors" onclick="document.getElementById('cartModal').remove()">
            继续购物
          </button>
          <button class="flex-1 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors" onclick="window.storeService.checkout()">
            结算
          </button>
        </div>
      </div>
    </div>
  `;
  
  // 添加到页面
  document.body.appendChild(cartModal);
}

// 更新商品数量
function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    // 如果数量小于1，从购物车移除
    removeFromCart(productId);
  } else {
    // 更新数量
    updateProductQuantity(productId, newQuantity);
  }
  
  // 重新显示购物车
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.remove();
    showCart();
  }
}

// 从购物车移除商品
function removeItem(productId) {
  removeFromCart(productId);
  
  // 重新显示购物车
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.remove();
    showCart();
  }
}

// 结算功能
function checkout() {
  // 这里应该跳转到结算页面或显示结算模态框
  alert('结算功能正在开发中，敬请期待！');
  
  // 关闭购物车模态框
  const cartModal = document.getElementById('cartModal');
  if (cartModal) {
    cartModal.remove();
  }
}

// 导出公共方法供全局使用
window.storeService = {
  showCart,
  updateQuantity,
  removeItem,
  checkout
};