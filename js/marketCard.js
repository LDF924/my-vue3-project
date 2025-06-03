// 市场行情卡片组件

// 初始化市场行情卡片
export async function initMarketCard() {
  try {
    // 获取市场概览数据
    const overviewData = await fetchMarketOverview();
    
    // 更新卡片内容
    updateMarketCard(overviewData);
    
    // 设置定时更新
    setInterval(async () => {
      const data = await fetchMarketOverview();
      updateMarketCard(data);
    }, 60000); // 每分钟更新一次
  } catch (error) {
    console.error('初始化市场行情卡片失败:', error);
  }
}

// 更新市场行情卡片
function updateMarketCard(data) {
  // 更新价格信息
  document.getElementById('marketPrice').textContent = data.currentPrice.toFixed(2);
  document.getElementById('marketPriceChange').textContent = 
    `${data.priceChange > 0 ? '+' : ''}${data.priceChange}%`;
  document.getElementById('marketPriceChange').className = 
    `text-sm ${data.priceChange > 0 ? 'text-accent' : 'text-red-500'}`;
  
  // 更新市场趋势
  document.getElementById('marketTrendText').textContent = data.trend;
  
  // 更新交易量
  document.getElementById('marketVolume').textContent = data.currentVolume;
  
  // 更新更新时间
  document.getElementById('marketUpdateTime').textContent = data.priceUpdateTime;
}

// 模拟获取市场概览数据
async function fetchMarketOverview() {
  // 实际项目中应该从后端API获取
  return {
    currentPrice: 8.5,
    priceUpdateTime: '2024-01-20 10:00',
    priceChange: 2.5,
    currentVolume: 1200,
    trend: '稳中向好'
  };
}