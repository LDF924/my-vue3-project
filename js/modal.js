// 模态框控制模块

// 显示添加产品模态框
export function showAddProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

// 隐藏添加产品模态框
export function hideAddProductModal() {
  const modal = document.getElementById('productModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}