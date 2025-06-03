// 病虫害识别模块

// 初始化病虫害识别模块
export function initPestIdentification() {
  const uploadArea = document.getElementById('uploadArea');
  const imageInput = document.getElementById('imageInput');
  const resultArea = document.getElementById('resultArea');
  const previewImage = document.getElementById('previewImage');
  const diseaseName = document.getElementById('diseaseName');
  const probability = document.getElementById('probability');
  const suggestions = document.getElementById('suggestions');

  // 点击上传区域触发文件选择
  uploadArea.addEventListener('click', () => {
    imageInput.click();
  });

  // 处理文件拖拽
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('border-primary');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('border-primary');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('border-primary');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  });

  // 处理文件选择
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  });

  // 处理图片上传和识别
  function handleImageUpload(file) {
    // 显示预览图
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // 调用识别API
    identifyDisease(file);
  }

  // 调用AI识别API
  async function identifyDisease(file) {
    try {
      // 创建FormData对象
      const formData = new FormData();
      formData.append('image', file);

      // 显示加载状态
      diseaseName.textContent = '识别中...';
      probability.textContent = '';
      suggestions.innerHTML = '';
      resultArea.classList.remove('hidden');

      // 发送识别请求
      const response = await fetch('/api/identify-disease', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('识别请求失败');
      }

      const result = await response.json();

      // 更新识别结果
      diseaseName.textContent = result.name;
      probability.textContent = `${(result.probability * 100).toFixed(1)}%`;

      // 更新防治建议
      suggestions.innerHTML = result.suggestions
        .map(suggestion => `<li>${suggestion}</li>`)
        .join('');

    } catch (error) {
      console.error('识别失败:', error);
      diseaseName.textContent = '识别失败';
      probability.textContent = '';
      suggestions.innerHTML = '<li class="text-red-500">图片识别失败，请重试</li>';
    }
  }
}

// 重置识别
export function resetIdentification() {
  const resultArea = document.getElementById('resultArea');
  const imageInput = document.getElementById('imageInput');
  
  resultArea.classList.add('hidden');
  imageInput.value = '';
}