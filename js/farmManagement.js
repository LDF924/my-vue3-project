// 农事管理模块
import { getWeatherData } from './api.js';

// 初始化农事管理页面
export function initFarmManagement() {
  initCalendar();
  initWeatherInfo();
  loadTasks();
  updateStatistics();
}

// 初始化日历
function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'zh-cn',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: [], // 将从后端API获取事件数据
    eventClick: function(info) {
      // 点击事件时显示详情
      showTaskDetails(info.event);
    }
  });
  calendar.render();
}

// 获取并显示天气信息
async function initWeatherInfo() {
  try {
    const weatherData = await getWeatherData();
    updateWeatherDisplay(weatherData);
  } catch (error) {
    console.error('获取天气信息失败:', error);
  }
}

// 更新天气显示
function updateWeatherDisplay(data) {
  const weatherEl = document.getElementById('weather');
  // TODO: 根据实际天气数据更新显示
  weatherEl.innerHTML = `
    <i class="fa fa-${getWeatherIcon(data.weather)} text-4xl text-primary mb-2"></i>
    <div class="font-semibold">${data.temperature}°C</div>
    <div class="text-sm text-gray-600">${data.description}</div>
  `;
}

// 获取天气图标
function getWeatherIcon(weather) {
  const icons = {
    sunny: 'sun',
    cloudy: 'cloud',
    rainy: 'cloud-rain',
    // 添加更多天气类型
  };
  return icons[weather] || 'cloud';
}

// 加载任务列表
async function loadTasks() {
  try {
    // TODO: 从API获取任务数据
    const tasks = await fetchTasks();
    updateTaskList(tasks);
    updateCalendarEvents(tasks);
  } catch (error) {
    console.error('加载任务失败:', error);
  }
}

// 更新任务列表显示
function updateTaskList(tasks) {
  const recentTasksEl = document.getElementById('recentTasks');
  recentTasksEl.innerHTML = tasks.map(task => `
    <div class="flex items-center justify-between p-4 bg-neutral rounded-lg">
      <div class="flex items-center space-x-4">
        <div class="${getTaskTypeColor(task.type)} w-2 h-2 rounded-full"></div>
        <div>
          <h4 class="font-medium">${task.title}</h4>
          <p class="text-sm text-gray-500">${task.date}</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span class="${getPriorityBadgeClass(task.priority)} px-2 py-1 rounded-full text-xs">
          ${task.priority}
        </span>
        <button onclick="completeTask('${task.id}')" class="text-gray-400 hover:text-primary">
          <i class="fa fa-check"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// 获取任务类型颜色
function getTaskTypeColor(type) {
  const colors = {
    fertilization: 'bg-green-500',
    pesticide: 'bg-red-500',
    pruning: 'bg-yellow-500',
    irrigation: 'bg-blue-500',
    harvest: 'bg-orange-500',
    other: 'bg-gray-500'
  };
  return colors[type] || colors.other;
}

// 获取优先级样式
function getPriorityBadgeClass(priority) {
  const classes = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };
  return classes[priority] || classes.medium;
}

// 更新统计信息
function updateStatistics() {
  // TODO: 从API获取统计数据
  document.getElementById('pendingTasks').textContent = '5';
  document.getElementById('weeklyCompleted').textContent = '12';
  document.getElementById('efficiency').textContent = '85%';
}

// 显示任务详情
function showTaskDetails(event) {
  // TODO: 实现任务详情显示逻辑
}

// 完成任务
async function completeTask(taskId) {
  try {
    // TODO: 调用API标记任务完成
    await markTaskComplete(taskId);
    loadTasks(); // 重新加载任务列表
    updateStatistics(); // 更新统计信息
  } catch (error) {
    console.error('完成任务失败:', error);
  }
}