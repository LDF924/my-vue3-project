// AI问答智能体
class AIAssistant {
  constructor() {
    this.systemPrompt = '你是一个专业的沃柑种植顾问，可以回答关于沃柑种植、病虫害防治、施肥管理等方面的问题。';
    this.knowledgeBase = [];
    this.initKnowledgeBase();
  }

  // 初始化知识库
  initKnowledgeBase() {
    // 从knowledge.js导入知识数据
    for (const category in knowledgeData) {
      knowledgeData[category].forEach(item => {
        this.knowledgeBase.push({
          id: item.id,
          title: item.title,
          content: item.content,
          category: item.category,
          tags: item.tags
        });
      });
    }
  }

  // 搜索相关知识
  searchKnowledge(query) {
    // 对查询词进行分词处理
    const keywords = query.toLowerCase().split(/\s+/);
    
    // 计算每个知识条目的相关度分数
    const scoredResults = this.knowledgeBase.map(item => {
      const searchText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
      
      // 计算关键词匹配分数
      let score = 0;
      keywords.forEach(keyword => {
        // 标题匹配权重更高
        if (item.title.toLowerCase().includes(keyword)) {
          score += 3;
        }
        // 内容匹配
        if (searchText.includes(keyword)) {
          score += 1;
        }
        // 标签精确匹配权重最高
        if (item.tags.some(tag => tag.toLowerCase() === keyword)) {
          score += 5;
        }
      });
      
      return { item, score };
    });
    
    // 按相关度分数排序并返回结果
    return scoredResults
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.item);
  }

  // 生成回答
  async generateAnswer(query) {
    // 搜索相关知识
    const relevantKnowledge = this.searchKnowledge(query);
    
    // 构建上下文
    let context = '';
    if (relevantKnowledge.length > 0) {
      // 只使用最相关的3条知识
      context = relevantKnowledge
        .slice(0, 3)
        .map(item => `${item.title}:\n${item.content}`)
        .join('\n\n');
    }

    // 根据问题类型构建特定的提示词
    let promptTemplate = '';
    if (query.includes('如何') || query.includes('怎么')) {
      promptTemplate = '请提供具体的步骤说明和操作建议。';
    } else if (query.includes('为什么')) {
      promptTemplate = '请解释原因和机理，并提供相关的科学依据。';
    } else if (query.includes('区别') || query.includes('比较')) {
      promptTemplate = '请从多个方面进行对比分析，并总结主要差异。';
    } else {
      promptTemplate = '请提供简洁明了的答案，并适当补充相关知识。';
    }

    // 构建完整提示词
    const prompt = `
      ${this.systemPrompt}\n\n
      相关知识：\n${context}\n\n
      用户问题：${query}\n\n
      ${promptTemplate}\n
      如果知识库中没有相关信息，请说明无法回答。回答时注意：
      1. 保持专业性和准确性
      2. 语言要通俗易懂
      3. 适当举例说明
      4. 如有需要，可以提供预防和解决建议
    `;

    try {
      // 调用API获取回答
      const response = await this.callAPI(prompt);
      
      // 如果没有找到相关知识
      if (relevantKnowledge.length === 0) {
        return '抱歉，我在知识库中没有找到与您问题相关的信息。建议您：\n1. 换个方式提问\n2. 咨询在线农技专家\n3. 查看知识库中的相关专题文章';
      }
      
      return response;
    } catch (error) {
      console.error('生成回答失败:', error);
      return '抱歉，系统暂时出现问题。请稍后再试，或联系在线农技专家获取帮助。';
    }
  }

  // 调用API（示例实现）
  async callAPI(prompt) {
    // 这里应该实现实际的API调用
    // 目前返回模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('这是一个模拟的AI回答。在实际实现中，这里应该调用真实的AI服务API。');
      }, 1000);
    });
  }
}

// 创建AI助手实例
const aiAssistant = new AIAssistant();

// 处理用户提问
export async function handleUserQuestion(question) {
  const answer = await aiAssistant.generateAnswer(question);
  return answer;
}

// 初始化AI助手界面
export function initAIAssistant() {
  const aiChatbox = document.createElement('div');
  aiChatbox.innerHTML = `
    <div class="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform" id="aiChatbox">
      <div class="flex items-center justify-between bg-primary p-4">
        <div class="flex items-center space-x-2">
          <i class="fa fa-robot text-white"></i>
          <h3 class="text-white font-semibold">智能助手</h3>
        </div>
        <button onclick="toggleAIChatbox()" class="text-white hover:text-gray-200 transition-colors">
          <i class="fa fa-minus"></i>
        </button>
      </div>
      <div class="h-96 overflow-y-auto p-4" id="chatMessages">
        <div class="bg-gray-100 rounded-lg p-3 mb-4">
          <p class="text-gray-700">你好！我是沃柑种植智能助手，请问有什么可以帮你？</p>
        </div>
      </div>
      <div class="p-4 border-t">
        <div class="flex space-x-2">
          <input type="text" id="questionInput" placeholder="输入你的问题..." 
                 class="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/50">
          <button onclick="sendQuestion()" class="btn-primary">
            <i class="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(aiChatbox);

  // 添加全局函数
  window.toggleAIChatbox = () => {
    const chatbox = document.getElementById('aiChatbox');
    chatbox.classList.toggle('translate-y-[calc(100%-3.5rem)]');
  };

  window.sendQuestion = async () => {
    const questionInput = document.getElementById('questionInput');
    const chatMessages = document.getElementById('chatMessages');
    const question = questionInput.value.trim();

    if (!question) return;

    // 添加用户问题
    chatMessages.innerHTML += `
      <div class="flex justify-end mb-4">
        <div class="bg-primary/10 rounded-lg p-3 max-w-[80%]">
          <p class="text-gray-700">${question}</p>
        </div>
      </div>
    `;

    // 清空输入框
    questionInput.value = '';

    // 显示加载状态
    chatMessages.innerHTML += `
      <div class="mb-4" id="loadingMessage">
        <div class="bg-gray-100 rounded-lg p-3 max-w-[80%] flex items-center space-x-2">
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    `;

    // 获取AI回答
    const answer = await handleUserQuestion(question);

    // 移除加载状态
    document.getElementById('loadingMessage').remove();

    // 添加AI回答
    chatMessages.innerHTML += `
      <div class="mb-4">
        <div class="bg-gray-100 rounded-lg p-3 max-w-[80%]">
          <p class="text-gray-700">${answer}</p>
        </div>
      </div>
    `;

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  // 绑定回车发送
  document.getElementById('questionInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      window.sendQuestion();
    }
  });
}