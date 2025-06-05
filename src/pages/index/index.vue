<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>

    <!-- Dashboard Section -->
    <view class="dashboard-section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">数据概览</text>
      <view class="grid grid-cols-2 gap-4">
        <view class="metric-card p-4 bg-gray-100 rounded-lg">
          <text class="text-gray-600">总产量</text>
          <text class="text-2xl font-bold" data-summary="totalOutput">--</text>
        </view>
        <view class="metric-card p-4 bg-gray-100 rounded-lg">
          <text class="text-gray-600">总农户</text>
          <text class="text-2xl font-bold" data-summary="farmerCount">--</text>
        </view>
        <view class="metric-card p-4 bg-gray-100 rounded-lg">
          <text class="text-gray-600">月度产量趋势</text>
          <text class="text-2xl font-bold" data-production="latestProduction">--</text>
        </view>
        <view class="metric-card p-4 bg-gray-100 rounded-lg">
          <text class="text-gray-600">平均糖度</text>
          <text class="text-2xl font-bold" data-quality="糖度(°Brix)">--</text>
        </view>
      </view>
    </view>

    <!-- Traceability Section -->
    <view class="traceability-section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">产品溯源</text>
      <view class="grid grid-cols-3 gap-4 text-center mb-6">
        <view class="p-4 bg-gray-100 rounded-lg">
          <text class="block text-gray-600">已溯源产品</text>
          <text id="totalTracedProducts" class="text-2xl font-bold">0</text>
        </view>
        <view class="p-4 bg-gray-100 rounded-lg">
          <text class="block text-gray-600">本月新增</text>
          <text id="monthlyNewProducts" class="text-2xl font-bold">0</text>
        </view>
        <view class="p-4 bg-gray-100 rounded-lg">
          <text class="block text-gray-600">总扫码次数</text>
          <text id="totalScanCount" class="text-2xl font-bold">0</text>
        </view>
      </view>
      <view id="latestProducts" class="grid grid-cols-1 gap-4"></view>
    </view>

    <!-- Recent News Section -->
    <view class="recent-news-section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">最新新闻</text>
      <ul id="recentNewsList" class="list-disc pl-5">
        <!-- News items will be dynamically loaded here -->
        <li class="text-gray-500">加载中...</li>
      </ul>
    </view>

    <!-- Market Overview Section -->
    <view class="section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">市场行情</text>
      <view id="marketOverview" class="text-gray-600 leading-relaxed">
        <text class="text-gray-500">加载中...</text>
      </view>
    </view>

    <!-- Smart Agriculture Overview Section -->
    <view class="section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">智慧农业</text>
      <view id="smartAgricultureOverview" class="text-gray-600 leading-relaxed">
        <text class="text-gray-500">加载中...</text>
      </view>
    </view>

    <!-- Agricultural Supplies Section -->
    <view class="section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">农资商城</text>
      <view id="storeProductsList" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Products will be dynamically loaded here -->
        <view class="p-4 bg-gray-100 rounded-lg text-gray-500">加载中...</view>
      </view>
      <view class="text-center mt-4">
        <navigator url="/pages/store/store" class="text-primary hover:underline">查看更多</navigator>
      </view>
    </view>

    <!-- Supply Listings Section -->
    <view class="section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">挂牌交易</text>
      <view id="listingsList" class="grid grid-cols-1 gap-4">
        <!-- Listings will be dynamically loaded here -->
        <view class="p-4 bg-gray-100 rounded-lg text-gray-500">加载中...</view>
      </view>
      <view class="text-center mt-4">
        <navigator url="/pages/listings/listings" class="text-primary hover:underline">查看更多</navigator>
      </view>
    </view>

    <!-- Live Streams Section -->
    <view class="section mt-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">直播中心</text>
      <view id="liveStreamsList" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Live streams will be dynamically loaded here -->
        <view class="p-4 bg-gray-100 rounded-lg text-gray-500">加载中...</view>
      </view>
      <view class="text-center mt-4">
        <navigator url="/pages/live/live" class="text-primary hover:underline">查看更多</navigator>
      </view>
    </view>

    <!-- Knowledge Center Section -->
    <view class="section mt-8 mb-8 w-full p-4 bg-white rounded-lg shadow-md">
      <text class="section-title text-xl font-bold mb-4 block">知识中心</text>
      <view id="knowledgeArticlesList" class="grid grid-cols-1 gap-4">
        <!-- Articles will be dynamically loaded here -->
        <view class="p-4 bg-gray-100 rounded-lg text-gray-500">加载中...</view>
      </view>
      <view class="text-center mt-4">
        <navigator url="/pages/knowledge/knowledge" class="text-primary hover:underline">查看更多</navigator>
      </view>
    </view>

  </view>
</template>

<script>
import { initHomeData } from '../../js/homeData.js';
import { initAuthModal } from '../../js/auth.js';
import { initStoreService } from '../../js/storeService.js';
import { initTraceability } from '../../js/traceability.js';
import { initKnowledge } from '../../js/knowledge.js';
import { initMarketCard } from '../../js/marketCard.js';
import { initMarketData } from '../../js/marketData.js';
import { initCommunity } from '../../js/community.js';
import { initCommunityData } from '../../js/communityData.js';
import { initCommunitySearch } from '../../js/communitySearch.js';
import { initDashboard } from '../../js/dashboard.js';
import { initFarmManagement } from '../../js/farmManagement.js';
import { initFinanceService } from '../../js/financeService.js';
import { initPestIdentification } from '../../js/pestIdentification.js';

export default {
  data() {
    return {
      title: '智慧农业平台',
    }
  },
  onLoad() {
    initHomeData(); // Initialize home data fetching and updates
    initAuthModal();
    initStoreService();
    initTraceability();
    initKnowledge();
    initMarketCard();
    initMarketData();
    initCommunity();
    initCommunityData();
    initCommunitySearch();
    initDashboard();
    initFarmManagement();
    initFinanceService();
    initPestIdentification();
  },
  methods: {},
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

/* Add new styles for dashboard and traceability sections */
.dashboard-section, .traceability-section {
  width: 90%; /* Adjust as needed */
  max-width: 800px; /* Adjust as needed */
  margin-left: auto;
  margin-right: auto;
}

.section-title {
  color: #0F5132; /* A shade of green for agriculture theme */
}

.metric-card {
  border: 1px solid #e0e0e0;
}

.metric-card text:first-child {
  font-size: 0.9rem;
}

.metric-card text:last-child {
  color: #0F5132;
}

.traceability-section .text-2xl {
  color: #FF8C00; /* A shade of orange for attention */
}

.card-hover {
  transition: transform 0.2s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-5px);
}

.recent-news-section ul {
  list-style: none; /* Remove default bullet points */
  padding-left: 0;
}

.recent-news-section li {
  margin-bottom: 0.5rem;
}

.recent-news-section a {
  color: #0F5132; /* Match theme color */
  text-decoration: none;
}

.recent-news-section a:hover {
  text-decoration: underline;
}

.section {
  width: 90%; /* Adjust as needed */
  max-width: 800px; /* Adjust as needed */
  margin-left: auto;
  margin-right: auto;
}

.section .section-title {
  color: #0F5132;
}

.section .text-primary {
  color: #FF8C00;
}

.section .hover\:underline:hover {
  text-decoration: underline;
}

.product-card, .listing-card, .stream-card, .article-card {
  border: 1px solid #e0e0e0;
  transition: transform 0.2s ease-in-out;
}

.product-card:hover, .listing-card:hover, .stream-card:hover, .article-card:hover {
  transform: translateY(-5px);
}
</style>
