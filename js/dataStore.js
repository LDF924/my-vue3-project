// 数据存储和共享模块

// 定义数据存储对象
const dataStore = {
  // 数据缓存
  cache: {
    summaryMetrics: null,
    monthlyProduction: null,
    regionDistribution: null,
    qualityMetrics: null,
    industryMap: null
  },

  // 订阅者列表
  subscribers: [],

  // 最后更新时间
  lastUpdate: {
    summaryMetrics: 0,
    monthlyProduction: 0,
    regionDistribution: 0,
    qualityMetrics: 0,
    industryMap: 0
  },

  // 缓存过期时间（毫秒）
  cacheExpiration: 60000, // 1分钟

  // 添加订阅者
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  },

  // 通知所有订阅者
  notifySubscribers(dataType, data) {
    this.subscribers.forEach(callback => callback(dataType, data));
  },

  // 更新数据
  updateData(dataType, data) {
    this.cache[dataType] = data;
    this.lastUpdate[dataType] = Date.now();
    this.notifySubscribers(dataType, data);
  },

  // 获取数据
  async getData(dataType, endpoint, forceUpdate = false) {
    const now = Date.now();
    const lastUpdate = this.lastUpdate[dataType];

    // 检查缓存是否有效
    if (!forceUpdate && 
        this.cache[dataType] && 
        (now - lastUpdate) < this.cacheExpiration) {
      return this.cache[dataType];
    }

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      this.updateData(dataType, data);
      return data;
    } catch (error) {
      console.error(`获取${dataType}数据失败:`, error);
      // 如果有缓存数据，在请求失败时返回缓存
      if (this.cache[dataType]) {
        return this.cache[dataType];
      }
      throw error;
    }
  },

  // 清除缓存
  clearCache(dataType = null) {
    if (dataType) {
      this.cache[dataType] = null;
      this.lastUpdate[dataType] = 0;
    } else {
      Object.keys(this.cache).forEach(key => {
        this.cache[key] = null;
        this.lastUpdate[key] = 0;
      });
    }
  }
};

// 导出数据存储实例
export default dataStore;