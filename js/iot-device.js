// 智能设备管理页面交互逻辑

document.addEventListener('DOMContentLoaded', function () {
  // 环境监测设备数据模拟
  const envData = {
    temp: 25.3,
    humidity: 68,
    soilTemp: 22.1,
    soilHumidity: 54
  };

  // 刷新温湿度
  document.getElementById('refresh-env').addEventListener('click', function () {
    envData.temp = (24 + Math.random() * 3).toFixed(1);
    envData.humidity = (65 + Math.random() * 10).toFixed(0);
    document.getElementById('env-temp').textContent = envData.temp + '°C';
    document.getElementById('env-humidity').textContent = envData.humidity + '%';
  });
  document.getElementById('refresh-soil').addEventListener('click', function () {
    envData.soilTemp = (21 + Math.random() * 3).toFixed(1);
    envData.soilHumidity = (50 + Math.random() * 10).toFixed(0);
    document.getElementById('soil-temp').textContent = envData.soilTemp + '°C';
    document.getElementById('soil-humidity').textContent = envData.soilHumidity + '%';
  });

  // 灌溉/施肥控制
  let irrigationOn = false;
  let fertilizationOn = false;
  const irrigationStatus = document.getElementById('irrigation-status');
  const fertilizationStatus = document.getElementById('fertilization-status');

  document.getElementById('open-irrigation').addEventListener('click', function () {
    irrigationOn = true;
    irrigationStatus.textContent = '开启';
    irrigationStatus.classList.remove('text-blue-500');
    irrigationStatus.classList.add('text-green-500');
  });
  document.getElementById('close-irrigation').addEventListener('click', function () {
    irrigationOn = false;
    irrigationStatus.textContent = '关闭';
    irrigationStatus.classList.remove('text-green-500');
    irrigationStatus.classList.add('text-blue-500');
  });
  document.getElementById('open-fertilization').addEventListener('click', function () {
    fertilizationOn = true;
    fertilizationStatus.textContent = '开启';
    fertilizationStatus.classList.remove('text-green-500');
    fertilizationStatus.classList.add('text-blue-500');
  });
  document.getElementById('close-fertilization').addEventListener('click', function () {
    fertilizationOn = false;
    fertilizationStatus.textContent = '关闭';
    fertilizationStatus.classList.remove('text-blue-500');
    fertilizationStatus.classList.add('text-green-500');
  });

  // 视频监控全屏占位
  document.getElementById('fullscreen-field').addEventListener('click', function () {
    alert('全屏功能待接入实际视频流');
  });
  document.getElementById('fullscreen-warehouse').addEventListener('click', function () {
    alert('全屏功能待接入实际视频流');
  });
}); 