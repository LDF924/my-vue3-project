// API接口模块

// 获取天气数据
export async function getWeatherData() {
  try {
    // TODO: 对接实际的天气API
    return {
      temperature: 25,
      weather: 'sunny',
      description: '晴朗'
    };
  } catch (error) {
    console.error('获取天气数据失败:', error);
    throw error;
  }
}

// 获取农事任务列表
export async function fetchTasks() {
  try {
    // TODO: 对接后端API
    return [
      {
        id: '1',
        title: '春季施肥',
        type: 'fertilization',
        date: '2024-03-15',
        priority: 'high',
        description: '使用有机肥进行春季施肥'
      },
      {
        id: '2',
        title: '病虫害防治',
        type: 'pesticide',
        date: '2024-03-20',
        priority: 'medium',
        description: '预防性喷药防治病虫害'
      }
    ];
  } catch (error) {
    console.error('获取任务列表失败:', error);
    throw error;
  }
}

// 创建新任务
export async function createTask(taskData) {
  try {
    // TODO: 调用后端API创建任务
    return {
      success: true,
      taskId: 'new-task-id'
    };
  } catch (error) {
    console.error('创建任务失败:', error);
    throw error;
  }
}

// 更新任务状态
export async function updateTaskStatus(taskId, status) {
  try {
    // TODO: 调用后端API更新任务状态
    return {
      success: true
    };
  } catch (error) {
    console.error('更新任务状态失败:', error);
    throw error;
  }
}

// 标记任务完成
export async function markTaskComplete(taskId) {
  try {
    // TODO: 调用后端API标记任务完成
    return {
      success: true
    };
  } catch (error) {
    console.error('标记任务完成失败:', error);
    throw error;
  }
}

// 获取农事统计数据
export async function getFarmingStatistics() {
  try {
    // TODO: 调用后端API获取统计数据
    return {
      pendingTasks: 5,
      weeklyCompleted: 12,
      efficiency: '85%'
    };
  } catch (error) {
    console.error('获取统计数据失败:', error);
    throw error;
  }
}

// 用户认证相关API
const authAPI = {
  // 用户登录
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 用户注册
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

// 社区帖子相关API
const postAPI = {
  // 获取帖子列表
  getPosts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/community?${queryString}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 创建新帖子
  createPost: async (postData) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      // 添加文本数据
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      if (postData.tags) {
        formData.append('tags', JSON.stringify(postData.tags));
      }

      // 添加图片文件
      if (postData.images) {
        postData.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const response = await fetch(`${API_BASE_URL}/community`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 获取帖子详情
  getPostDetail: async (postId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/community/${postId}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 更新帖子
  updatePost: async (postId, updateData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/community/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 删除帖子
  deletePost: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/community/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 添加评论
  addComment: async (postId, content) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/community/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 点赞/取消点赞
  toggleLike: async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/community/${postId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }
};

// 导出API模块
const api = {
  auth: authAPI,
  post: postAPI
};

window.api = api;