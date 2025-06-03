// 首页数据展示模块
import dataStore from './dataStore.js';

// 定义API端点
const API_ENDPOINTS = {
  summary: '/api/dashboard/metrics',  // 关键指标
  monthlyProduction: '/api/dashboard/production-trend',  // 月度产量趋势
  qualityMetrics: '/api/dashboard/quality-metrics',  // 品质指标
  recentNews: '/api/home/data', // 最新新闻
  marketOverview: '/api/marketV2/overview', // 市场行情概览
  smartAgricultureOverview: '/api/smartAgriculture/overview', // 智慧农业概览
  storeProducts: '/api/store/products', // 农资商品列表
  listings: '/api/listings', // 挂牌交易列表
  liveStreams: '/api/live/streams', // 直播列表
  knowledgeArticles: '/api/knowledge/articles', // 知识文章列表
};

// 更新间隔（毫秒）
const UPDATE_INTERVAL = 60000; // 1分钟

// 初始化首页数据展示
export function initHomeData() {
  // 初始化数据订阅
  dataStore.subscribe((dataType, data) => {
    switch(dataType) {
      case 'summaryMetrics':
        updateHomeSummary(data);
        break;
      case 'monthlyProduction':
        updateHomeProduction(data);
        break;
      case 'qualityMetrics':
        updateHomeQuality(data);
        break;
      case 'recentNews':
        updateRecentNews(data);
        break;
      case 'marketOverview':
        updateMarketOverview(data);
        break;
      case 'smartAgricultureOverview':
        updateSmartAgricultureOverview(data);
        break;
      case 'storeProducts':
        updateStoreProducts(data);
        break;
      case 'listings':
        updateListings(data);
        break;
      case 'liveStreams':
        updateLiveStreams(data);
        break;
      case 'knowledgeArticles':
        updateKnowledgeArticles(data);
        break;
    }
  });

  // 初始化首页数据
  updateHomeData();
  
  // 初始化溯源数据展示
  updateTraceabilitySection();

  // 设置定时更新
  setInterval(updateHomeData, UPDATE_INTERVAL);
  
  // 监听产品数据更新事件
  window.addEventListener('productDataUpdate', (event) => {
    updateTraceabilitySection();
  });
}

// 更新首页所有数据
async function updateHomeData() {
  try {
    // 获取关键指标数据
    const summaryData = await dataStore.getData('summaryMetrics', API_ENDPOINTS.summary);
    updateHomeSummary(summaryData);

    // 获取月度产量趋势数据
    const productionData = await dataStore.getData('monthlyProduction', API_ENDPOINTS.monthlyProduction);
    updateHomeProduction(productionData);

    // 获取品质指标数据
    const qualityData = await dataStore.getData('qualityMetrics', API_ENDPOINTS.qualityMetrics);
    updateHomeQuality(qualityData);

    // 获取最新新闻数据
    const newsData = await dataStore.getData('recentNews', API_ENDPOINTS.recentNews);
    updateRecentNews(newsData);

    // 获取市场行情概览数据
    const marketOverviewData = await dataStore.getData('marketOverview', API_ENDPOINTS.marketOverview);
    updateMarketOverview(marketOverviewData);

    // 获取智慧农业概览数据
    const smartAgricultureOverviewData = await dataStore.getData('smartAgricultureOverview', API_ENDPOINTS.smartAgricultureOverview);
    updateSmartAgricultureOverview(smartAgricultureOverviewData);

    // 获取农资商品数据
    const storeProductsData = await dataStore.getData('storeProducts', API_ENDPOINTS.storeProducts);
    updateStoreProducts(storeProductsData);

    // 获取挂牌交易数据
    const listingsData = await dataStore.getData('listings', API_ENDPOINTS.listings);
    updateListings(listingsData);

    // 获取直播数据
    const liveStreamsData = await dataStore.getData('liveStreams', API_ENDPOINTS.liveStreams);
    updateLiveStreams(liveStreamsData);

    // 获取知识文章数据
    const knowledgeArticlesData = await dataStore.getData('knowledgeArticles', API_ENDPOINTS.knowledgeArticles);
    updateKnowledgeArticles(knowledgeArticlesData);

  } catch (error) {
    console.error('更新首页数据失败:', error);
  }
}

// 更新首页关键指标
function updateHomeSummary(data) {
  // 更新首页上的关键指标显示
  const summaryElements = document.querySelectorAll('[data-summary]');
  summaryElements.forEach(element => {
    const metric = element.dataset.summary;
    if (data[metric]) {
      element.textContent = data[metric];
    }
  });
}

// 更新首页产量趋势
function updateHomeProduction(data) {
  // 更新首页上的产量趋势图表或数据显示
  const productionElement = document.querySelector('[data-production]');
  if (productionElement && data.production) {
    // 这里可以根据实际需求显示最新的产量数据或趋势
    const latestProduction = data.production[data.production.length - 1];
    productionElement.textContent = `${latestProduction}吨`;
  }
}

// 更新首页品质指标
function updateHomeQuality(data) {
  // 更新首页上的品质指标显示
  const qualityElements = document.querySelectorAll('[data-quality]');
  qualityElements.forEach(element => {
    const metric = element.dataset.quality;
    if (data.metrics && data.values) {
      const index = data.metrics.indexOf(metric);
      if (index !== -1) {
        element.textContent = `${data.values[index]}%`;
      }
    }
  });
}

// 更新溯源流程展示部分
function updateTraceabilitySection() {
  // 从localStorage获取产品数据
  const storedProducts = localStorage.getItem('traceProducts');
  const products = storedProducts ? JSON.parse(storedProducts) : [];
  
  // 更新溯源数据统计
  updateTraceStatistics(products);
  
  // 更新最新溯源产品展示
  updateLatestProducts(products);
}

// 更新溯源统计数据
function updateTraceStatistics(products) {
  // 更新已溯源产品数量
  const totalProducts = document.getElementById('totalTracedProducts');
  if (totalProducts) {
    totalProducts.textContent = products.length;
  }
  
  // 更新本月新增数量
  const monthlyNew = document.getElementById('monthlyNewProducts');
  if (monthlyNew) {
    const thisMonth = new Date().getMonth();
    const newCount = products.filter(p => {
      const productMonth = new Date(p.createdAt).getMonth();
      return productMonth === thisMonth;
    }).length;
    monthlyNew.textContent = newCount;
  }
  
  // 更新总扫码次数
  const totalScans = document.getElementById('totalScanCount');
  if (totalScans) {
    const scanCount = products.reduce((sum, p) => sum + (p.scanCount || 0), 0);
    totalScans.textContent = scanCount;
  }
}

// 更新最新溯源产品展示
function updateLatestProducts(products) {
  const latestProductsList = document.getElementById('latestProducts');
  if (!latestProductsList) return;
  
  // 获取最新的3个产品
  const latestProducts = products
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  // 清空现有内容
  latestProductsList.innerHTML = '';
  
  if (latestProducts.length === 0) {
    latestProductsList.innerHTML = '<p class="text-gray-500 text-center py-4">暂无溯源产品数据</p>';
    return;
  }
  
  // 添加最新产品卡片
  latestProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'bg-white rounded-lg shadow-md p-6 card-hover';
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
        <span class="text-sm text-gray-500">扫码次数：${product.scanCount || 0}</span>
        <a href="trace.html?id=${product.id}" class="text-primary hover:text-primary/80 text-sm">
          查看详情
        </a>
      </div>
    `;
    latestProductsList.appendChild(productCard);
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

// 更新最新新闻
function updateRecentNews(data) {
  const newsList = document.getElementById('recentNewsList');
  if (!newsList) return;

  newsList.innerHTML = ''; // Clear existing news

  if (data && data.recentNews && data.recentNews.length > 0) {
    data.recentNews.forEach(newsItem => {
      const listItem = document.createElement('li');
      listItem.className = 'mb-2';
      listItem.innerHTML = `<a href="#" class="text-blue-600 hover:underline">${newsItem.title} - ${newsItem.date}</a>`;
      newsList.appendChild(listItem);
    });
  } else {
    newsList.innerHTML = '<p class="text-gray-500">暂无最新新闻。</p>';
  }
}

// 更新市场行情概览
function updateMarketOverview(data) {
  const marketOverviewElement = document.getElementById('marketOverview');
  if (!marketOverviewElement) return;

  if (data && data.mainProduct) {
    marketOverviewElement.innerHTML = `
      <p>主要产品：${data.mainProduct}</p>
      <p>平均价格：${data.averagePrice}元/斤</p>
      <p>价格趋势：${data.priceTrend}</p>
      <p>总成交量：${data.totalVolume}</p>
    `;
  } else {
    marketOverviewElement.innerHTML = '<p class="text-gray-500">暂无市场行情数据。</p>';
  }
}

// 更新智慧农业概览
function updateSmartAgricultureOverview(data) {
  const smartAgricultureOverviewElement = document.getElementById('smartAgricultureOverview');
  if (!smartAgricultureOverviewElement) return;

  if (data && data.deviceCount) {
    smartAgricultureOverviewElement.innerHTML = `
      <p>设备总数：${data.deviceCount}</p>
      <p>在线设备：${data.onlineDevices}</p>
      <p>当前温度：${data.sensorData.temperature}°C</p>
      <p>当前湿度：${data.sensorData.humidity}%</p>
      <p>待处理任务：${data.farmTaskSummary.pendingTasks}</p>
      <p>最新告警：${data.recentAlerts.join(', ') || '无'}</p>
    `;
  } else {
    smartAgricultureOverviewElement.innerHTML = '<p class="text-gray-500">暂无智慧农业数据。</p>';
  }
}

// 更新农资商品列表
function updateStoreProducts(data) {
  const storeProductsList = document.getElementById('storeProductsList');
  if (!storeProductsList) return;

  storeProductsList.innerHTML = '';

  if (data && data.products && data.products.length > 0) {
    data.products.slice(0, 4).forEach(product => { // Display up to 4 products
      const productCard = document.createElement('view');
      productCard.className = 'product-card p-4 bg-white rounded-lg shadow-sm flex items-center';
      productCard.innerHTML = `
        <image src="${product.image || '/static/placeholder.png'}" class="w-16 h-16 object-cover rounded-md mr-4"></image>
        <view>
          <text class="font-semibold text-lg">${product.name}</text>
          <text class="block text-primary text-md mt-1">¥${product.price} / ${product.unit}</text>
        </view>
      `;
      storeProductsList.appendChild(productCard);
    });
  } else {
    storeProductsList.innerHTML = '<view class="p-4 bg-gray-100 rounded-lg text-gray-500">暂无农资商品数据。</view>';
  }
}

// 更新挂牌交易列表
function updateListings(data) {
  const listingsList = document.getElementById('listingsList');
  if (!listingsList) return;

  listingsList.innerHTML = '';

  if (data && data.length > 0) {
    data.slice(0, 3).forEach(listing => { // Display up to 3 listings
      const listingCard = document.createElement('view');
      listingCard.className = 'listing-card p-4 bg-white rounded-lg shadow-sm';
      listingCard.innerHTML = `
        <text class="font-semibold text-lg block">${listing.product} - ${listing.quantity}</text>
        <text class="text-gray-600 text-sm mt-1 block">品质: ${listing.quality}</text>
        <text class="text-gray-500 text-xs mt-1 block">发布时间: ${listing.publishTime}</text>
      `;
      listingsList.appendChild(listingCard);
    });
  } else {
    listingsList.innerHTML = '<view class="p-4 bg-gray-100 rounded-lg text-gray-500">暂无挂牌交易信息。</view>';
  }
}

// 更新直播列表
function updateLiveStreams(data) {
  const liveStreamsList = document.getElementById('liveStreamsList');
  if (!liveStreamsList) return;

  liveStreamsList.innerHTML = '';

  if (data && data.length > 0) {
    data.slice(0, 2).forEach(stream => { // Display up to 2 live streams
      const streamCard = document.createElement('view');
      streamCard.className = 'stream-card p-4 bg-white rounded-lg shadow-sm';
      streamCard.innerHTML = `
        <image src="${stream.thumbnailUrl || '/static/placeholder-live.png'}" class="w-full h-32 object-cover rounded-md mb-2"></image>
        <text class="font-semibold text-base block truncate">${stream.title}</text>
        <text class="text-gray-600 text-sm mt-1">主播: ${stream.streamer}</text>
        <text class="text-red-500 text-sm float-right" v-if="${stream.status === 'live'}">● 直播中</text>
      `;
      liveStreamsList.appendChild(streamCard);
    });
  } else {
    liveStreamsList.innerHTML = '<view class="p-4 bg-gray-100 rounded-lg text-gray-500">暂无直播数据。</view>';
  }
}

// 更新知识文章列表
function updateKnowledgeArticles(data) {
  const knowledgeArticlesList = document.getElementById('knowledgeArticlesList');
  if (!knowledgeArticlesList) return;

  knowledgeArticlesList.innerHTML = '';

  if (data && data.length > 0) {
    data.slice(0, 3).forEach(article => { // Display up to 3 articles
      const articleCard = document.createElement('view');
      articleCard.className = 'article-card p-4 bg-white rounded-lg shadow-sm';
      articleCard.innerHTML = `
        <text class="font-semibold text-base block">${article.title}</text>
        <text class="text-gray-600 text-sm mt-1 block truncate">${article.summary}</text>
        <text class="text-gray-500 text-xs mt-1 block">发布日期: ${article.publishDate}</text>
      `;
      knowledgeArticlesList.appendChild(articleCard);
    });
  } else {
    knowledgeArticlesList.innerHTML = '<view class="p-4 bg-gray-100 rounded-lg text-gray-500">暂无知识文章。</view>';
  }
}