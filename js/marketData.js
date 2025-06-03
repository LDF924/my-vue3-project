// 市场行情数据处理模块

// 初始化市场行情数据
export async function initMarketData() {
  // 初始化各个图表和数据显示
  initPriceChart();
  initSupplyChart();
  initDemandChart();
  updateMarketOverview();
  loadMarketNews();

  // 添加时间范围选择器事件监听
  document.getElementById('timeRange').addEventListener('change', (e) => {
    updatePriceChart(e.target.value);
  });
}

// 更新市场概览数据
async function updateMarketOverview() {
  try {
    // 模拟从API获取数据
    const overviewData = await fetchMarketOverview();
    
    // 更新当前均价
    document.getElementById('currentPrice').textContent = overviewData.currentPrice.toFixed(2);
    document.getElementById('priceUpdateTime').textContent = overviewData.priceUpdateTime;
    document.getElementById('priceChange').textContent = 
      `${overviewData.priceChange > 0 ? '+' : ''}${overviewData.priceChange}%`;
    document.getElementById('priceChange').className = 
      `text-${overviewData.priceChange > 0 ? 'accent' : 'red-500'}`;

    // 更新交易量
    document.getElementById('currentVolume').textContent = overviewData.currentVolume;
    document.getElementById('volumeUpdateTime').textContent = overviewData.volumeUpdateTime;
    document.getElementById('volumeChange').textContent = 
      `${overviewData.volumeChange > 0 ? '+' : ''}${overviewData.volumeChange}%`;
    document.getElementById('volumeChange').className = 
      `text-${overviewData.volumeChange > 0 ? 'accent' : 'red-500'}`;

    // 更新市场趋势
    document.getElementById('marketTrend').textContent = overviewData.trend;
    document.getElementById('trendAnalysis').textContent = overviewData.trendAnalysis;

    // 更新供需数据
    updateSupplyDemandData(overviewData.supplyDemand);
  } catch (error) {
    console.error('更新市场概览数据失败:', error);
  }
}

// 初始化价格走势图
function initPriceChart() {
  const ctx = document.getElementById('priceChart').getContext('2d');
  const priceChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '价格走势',
        data: [],
        borderColor: '#FF8C00',
        backgroundColor: 'rgba(255, 140, 0, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  // 初始加载7天数据
  updatePriceChart(7);
}

// 更新价格走势图数据
async function updatePriceChart(days) {
  try {
    const priceData = await fetchPriceData(days);
    const chart = Chart.getChart('priceChart');
    
    chart.data.labels = priceData.dates;
    chart.data.datasets[0].data = priceData.prices;
    chart.update();
  } catch (error) {
    console.error('更新价格走势图失败:', error);
  }
}

// 初始化供应分析图表
function initSupplyChart() {
  const ctx = document.getElementById('supplyChart').getContext('2d');
  const supplyChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [{
        label: '供应量',
        data: [],
        backgroundColor: '#0F5132'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 初始化需求分析图表
function initDemandChart() {
  const ctx = document.getElementById('demandChart').getContext('2d');
  const demandChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [{
        label: '需求量',
        data: [],
        borderColor: '#22C55E',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// 更新供需数据
function updateSupplyDemandData(data) {
  // 更新供应数据
  document.getElementById('currentSupply').textContent = `${data.currentSupply}吨`;
  document.getElementById('expectedHarvest').textContent = `${data.expectedHarvest}吨`;
  document.getElementById('stockLevel').textContent = data.stockLevel;

  // 更新需求数据
  document.getElementById('currentDemand').textContent = `${data.currentDemand}吨`;
  document.getElementById('orderTrend').textContent = data.orderTrend;
  document.getElementById('mainSalesRegions').textContent = data.mainSalesRegions.join('、');

  // 更新图表
  updateSupplyChart(data.supplyTrend);
  updateDemandChart(data.demandTrend);
}

// 更新供应图表
function updateSupplyChart(data) {
  const chart = Chart.getChart('supplyChart');
  chart.data.datasets[0].data = data;
  chart.update();
}

// 更新需求图表
function updateDemandChart(data) {
  const chart = Chart.getChart('demandChart');
  chart.data.datasets[0].data = data;
  chart.update();
}

// 加载市场资讯
async function loadMarketNews() {
  try {
    const news = await fetchMarketNews();
    const newsContainer = document.getElementById('marketNews');
    
    news.forEach(item => {
      const newsCard = createNewsCard(item);
      newsContainer.appendChild(newsCard);
    });
  } catch (error) {
    console.error('加载市场资讯失败:', error);
  }
}

// 创建资讯卡片
function createNewsCard(news) {
  const card = document.createElement('div');
  card.className = 'bg-neutral rounded-lg p-4 card-hover';
  
  card.innerHTML = `
    <div class="flex items-start space-x-4">
      <img src="${news.image}" alt="${news.title}" class="w-24 h-24 object-cover rounded-lg">
      <div class="flex-1">
        <h3 class="font-semibold mb-2">${news.title}</h3>
        <p class="text-sm text-gray-600 mb-2">${news.summary}</p>
        <div class="flex items-center justify-between text-sm">
          <span class="text-gray-500">${news.date}</span>
          <a href="${news.url}" class="text-primary hover:text-primary/90">查看详情</a>
        </div>
      </div>
    </div>
  `;
  
  return card;
}

// 导出价格数据
window.exportPriceData = async function() {
  try {
    const data = await fetchPriceData(document.getElementById('timeRange').value);
    const csv = generateCSV(data);
    downloadCSV(csv, '武鸣沃柑价格数据.csv');
  } catch (error) {
    console.error('导出价格数据失败:', error);
  }
}

// 生成CSV数据
function generateCSV(data) {
  const rows = [['日期', '价格']];
  data.dates.forEach((date, index) => {
    rows.push([date, data.prices[index]]);
  });
  return rows.map(row => row.join(',')).join('\n');
}

// 下载CSV文件
function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// 模拟API请求函数
async function fetchMarketOverview() {
  // 模拟数据，实际项目中应该从后端API获取
  return {
    currentPrice: 8.5,
    priceUpdateTime: '2024-01-20 10:00',
    priceChange: 2.5,
    currentVolume: 1200,
    volumeUpdateTime: '2024-01-20 10:00',
    volumeChange: -1.2,
    trend: '稳中向好',
    trendAnalysis: '预计未来一周价格将保持稳定，略有上涨趋势',
    supplyDemand: {
      currentSupply: 5000,
      expectedHarvest: 8000,
      stockLevel: '适中',
      currentDemand: 6000,
      orderTrend: '持续增长',
      mainSalesRegions: ['广州', '深圳', '北京'],
      supplyTrend: [3000, 3500, 4000, 4500, 5000, 5500],
      demandTrend: [3500, 4000, 4500, 5000, 5500, 6000]
    }
  };
}

async function fetchPriceData(days) {
  // 模拟数据，实际项目中应该从后端API获取
  const dates = [];
  const prices = [];
  const basePrice = 8.5;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
    prices.push(basePrice + Math.random() * 2 - 1);
  }
  
  return { dates, prices };
}

async function fetchMarketNews() {
  // 模拟数据，实际项目中应该从后端API获取
  return [
    {
      title: '武鸣沃柑产业发展研讨会顺利召开',
      summary: '与会专家就产业发展趋势和市场前景进行深入探讨...',
      image: 'https://picsum.photos/200/200',
      date: '2024-01-20',
      url: '#'
    },
    {
      title: '2024年武鸣沃柑市场分析报告发布',
      summary: '报告显示今年武鸣沃柑市场需求持续增长...',
      image: 'https://picsum.photos/200/200',
      date: '2024-01-19',
      url: '#'
    }
  ];
}