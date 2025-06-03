// WebSocket连接URL
const WS_URL = 'ws://localhost:8080/ws/community';

// 社区数据状态
let communityStats = {
  discussions: 0,  // 综合讨论数
  techPosts: 0,   // 种植技术帖数
  marketInfo: 0,  // 市场行情数
  helpPosts: 0    // 问答互助数
};

// WebSocket实例
let ws = null;

// 重试配置
const RETRY_INTERVAL = 3000; // 重连间隔(ms)
const MAX_RETRIES = 5;       // 最大重试次数
let retryCount = 0;

// 初始化WebSocket连接
function initWebSocket() {
  try {
    ws = new WebSocket(WS_URL);
    
    ws.onopen = () => {
      console.log('社区数据WebSocket连接已建立');
      retryCount = 0; // 重置重试计数
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        updateCommunityStats(data);
      } catch (error) {
        console.error('解析社区数据失败:', error);
      }
    };
    
    ws.onclose = () => {
      console.log('社区数据WebSocket连接已关闭');
      handleReconnect();
    };
    
    ws.onerror = (error) => {
      console.error('社区数据WebSocket错误:', error);
      handleReconnect();
    };
  } catch (error) {
    console.error('初始化WebSocket失败:', error);
    handleReconnect();
  }
}

// 处理重连
function handleReconnect() {
  if (retryCount < MAX_RETRIES) {
    retryCount++;
    console.log(`尝试重新连接(${retryCount}/${MAX_RETRIES})...`);
    setTimeout(initWebSocket, RETRY_INTERVAL);
  } else {
    console.error('达到最大重试次数，启用轮询模式');
    initPolling();
  }
}

// 初始化轮询模式（作为WebSocket的备选方案）
function initPolling() {
  // 每30秒轮询一次
  setInterval(async () => {
    try {
      const response = await fetch('/api/community/stats');
      const data = await response.json();
      updateCommunityStats(data);
    } catch (error) {
      console.error('轮询社区数据失败:', error);
    }
  }, 30000);
}

// 更新社区数据统计
function updateCommunityStats(data) {
  communityStats = {
    discussions: data.discussions || 0,
    techPosts: data.techPosts || 0,
    marketInfo: data.marketInfo || 0,
    helpPosts: data.helpPosts || 0
  };
  
  // 更新DOM元素
  updateDOM();
}

// 更新DOM显示
function updateDOM() {
  // 更新综合讨论数
  const discussionsElement = document.querySelector('[data-community="discussions"]');
  if (discussionsElement) {
    discussionsElement.textContent = communityStats.discussions;
  }
  
  // 更新种植技术帖数
  const techPostsElement = document.querySelector('[data-community="techPosts"]');
  if (techPostsElement) {
    techPostsElement.textContent = communityStats.techPosts;
  }
  
  // 更新市场行情数
  const marketInfoElement = document.querySelector('[data-community="marketInfo"]');
  if (marketInfoElement) {
    marketInfoElement.textContent = communityStats.marketInfo;
  }
  
  // 更新问答互助数
  const helpPostsElement = document.querySelector('[data-community="helpPosts"]');
  if (helpPostsElement) {
    helpPostsElement.textContent = communityStats.helpPosts;
  }
}

// 导出初始化函数
export function initCommunityData() {
  // 初始化WebSocket连接
  initWebSocket();
  
  // 页面卸载时关闭WebSocket连接
  window.addEventListener('unload', () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  });
}