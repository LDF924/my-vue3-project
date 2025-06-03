// 数据看板模块
import dataStore from './dataStore.js';

// 定义API端点
const API_ENDPOINTS = {
  summary: '/api/dashboard/summary',  // 顶部四个关键指标
  monthlyProduction: '/api/dashboard/monthly-production',  // 月度产量趋势
  regionDistribution: '/api/dashboard/region-distribution',  // 种植区域分布
  qualityMetrics: '/api/dashboard/quality-metrics',  // 品质指标
  industryMap: '/api/dashboard/industry-map'  // 产业地图数据
};

// 更新间隔（毫秒）
const UPDATE_INTERVAL = 60000; // 1分钟

// 初始化所有图表
function initDashboard() {
  // 初始化顶部指标
  updateSummaryMetrics();
  
  // 初始化月度产量趋势图
  const productionChart = new Chart(
    document.getElementById('productionTrend'),
    {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: '月度产量',
          data: [],
          borderColor: '#22C55E',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '月度产量趋势'
          }
        }
      }
    }
  );

  // 初始化种植区域分布图
  const regionChart = new Chart(
    document.getElementById('regionDistribution'),
    {
      type: 'pie',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [
            '#0F5132',
            '#22C55E',
            '#4ADE80',
            '#86EFAC',
            '#BBF7D0'
          ]
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '种植区域分布'
          }
        }
      }
    }
  );

  // 初始化品质指标雷达图
  const qualityChart = new Chart(
    document.getElementById('qualityMetrics'),
    {
      type: 'radar',
      data: {
        labels: [],
        datasets: [{
          label: '品质指标',
          data: [],
          borderColor: '#FF8C00',
          backgroundColor: 'rgba(255, 140, 0, 0.2)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: '品质指标分布'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    }
  );

  // 设置定时更新
  setInterval(() => {
    updateSummaryMetrics();
    updateProductionTrend(productionChart);
    updateRegionDistribution(regionChart);
    updateQualityMetrics(qualityChart);
    updateIndustryMap();
  }, UPDATE_INTERVAL);

  // 立即更新一次数据
  updateProductionTrend(productionChart);
  updateRegionDistribution(regionChart);
  updateQualityMetrics(qualityChart);
  updateIndustryMap();
}

// 更新顶部四个关键指标
async function updateSummaryMetrics() {
  try {
    const data = await dataStore.getData('summaryMetrics', API_ENDPOINTS.summary);
    
    // 更新DOM元素
    document.getElementById('totalArea').textContent = data.totalArea + '亩';
    document.getElementById('annualProduction').textContent = data.annualProduction + '吨';
    document.getElementById('farmerCount').textContent = data.farmerCount + '户';
    document.getElementById('averagePrice').textContent = data.averagePrice + '元/kg';
  } catch (error) {
    console.error('更新关键指标失败:', error);
  }
}

// 更新月度产量趋势图
async function updateProductionTrend(chart) {
  try {
    const data = await dataStore.getData('monthlyProduction', API_ENDPOINTS.monthlyProduction);
    
    chart.data.labels = data.months;
    chart.data.datasets[0].data = data.production;
    chart.update();
  } catch (error) {
    console.error('更新月度产量趋势图失败:', error);
  }
}

// 更新种植区域分布图
async function updateRegionDistribution(chart) {
  try {
    const data = await dataStore.getData('regionDistribution', API_ENDPOINTS.regionDistribution);
    
    chart.data.labels = data.regions;
    chart.data.datasets[0].data = data.distribution;
    chart.update();
  } catch (error) {
    console.error('更新种植区域分布图失败:', error);
  }
}

// 更新品质指标雷达图
async function updateQualityMetrics(chart) {
  try {
    const data = await dataStore.getData('qualityMetrics', API_ENDPOINTS.qualityMetrics);
    
    chart.data.labels = data.metrics;
    chart.data.datasets[0].data = data.values;
    chart.update();
  } catch (error) {
    console.error('更新品质指标雷达图失败:', error);
  }
}

// 更新产业地图
async function updateIndustryMap() {
  try {
    const data = await dataStore.getData('industryMap', API_ENDPOINTS.industryMap);
    
    // 这里需要根据具体的地图库来更新地图数据
    // 例如使用高德地图或百度地图的API
    updateMapData(data);
  } catch (error) {
    console.error('更新产业地图失败:', error);
  }
}

// 地图数据更新函数（需要根据具体使用的地图库来实现）
function updateMapData(data) {
  // 实现地图数据更新逻辑
}

// 导出初始化函数
export { initDashboard };