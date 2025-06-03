# 武鸣沃柑产业数字化平台

## 项目简介
武鸣沃柑产业数字化平台是一个专注于沃柑产业发展的综合性数字化解决方案。该平台旨在通过数字化手段提升沃柑产业的管理效率、技术水平和市场竞争力。

## 主要功能

### 1. 数据看板
- 产业数据可视化展示
- 实时市场行情监测
- 生产数据统计分析

### 2. 交流社区
- 技术经验分享
- 市场信息交流
- 问答互助平台
- 专家在线指导

### 3. 产品溯源
- 产品质量追溯
- 生产过程记录
- 溯源信息查询

### 4. 服务中心
- 技术服务支持
- 市场营销对接
- 物流配送服务

## 新增功能

### 1. 挂牌交易
- 在线发布交易信息
- 智能匹配供需
- 区块链存证，确保交易透明和安全

### 2. 物流与仓储管理
- 物流订单跟踪与可视化
- 智能仓储调配
- 冷链物流监控

### 3. 金融服务
- 基于信用的供应链金融
- 农业保险产品
- 融资租赁服务

### 4. AI病虫害诊断
- 上传病害图片，AI自动识别病虫害类型
- 提供防治建议和用药指导

### 5. 市场预测与分析
- 基于大数据分析的市场趋势预测
- 价格波动预警
- 辅助种植决策

## 技术栈

- 前端框架：原生JavaScript + Tailwind CSS
- UI组件：Font Awesome图标
- 图表可视化：Chart.js
- 自定义Tailwind CSS配置（在index.html中定义）
- 字体：Inter (Google Fonts)

## 项目结构

```
├── components/          # 可复用组件
├── js/                  # JavaScript模块
│   ├── auth.js         # 用户认证
│   ├── communityData.js # 社区数据
│   ├── homeData.js      # 首页数据
│   └── register.js      # 用户注册
├── public/             # 静态资源
├── src/                # 源代码
│   ├── app.js          # 应用入口
│   ├── middleware/     # 中间件
│   ├── models/         # 数据模型
│   └── routes/         # 路由配置
├── index.html          # 首页
├── dashboard.html      # 数据看板
└── community.html      # 社区页面
```

## 安装和使用

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中访问
```
http://localhost:8080
```

## 贡献指南

欢迎提交问题和改进建议。如果您想贡献代码：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

## 开源许可

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件