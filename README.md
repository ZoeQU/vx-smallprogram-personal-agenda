# 日程记录表单

这是一个帮助用户管理一天时间的小程序。用户可以以 **15 分钟为单位**记录和查看每天的日程，操作简单，界面清晰，方便随时查看和编辑自己的安排。

---

## 功能介绍

- **时间块管理**：每天从 **早上 8 点到晚上 11 点**，划分为 15 分钟的时间块，可自由添加、查看和修改内容。
- **红点提示**：有内容的时间块会显示红点，方便快速识别。
- **轻松编辑**：支持新增、修改或删除日程内容。
- **界面简洁**：直观的时间表设计，操作方便。

---

## 文件结构

```bash
project-root/
├── app.js       // 小程序主逻辑
├── app.json     // 全局配置文件
├── app.wxss     // 全局样式文件
├── pages/
│   ├── index/   // 首页(日程表页面)
│   │   ├── index.js    // 逻辑文件
│   │   ├── index.json  // 页面配置
│   │   ├── index.wxml  // 页面结构
│   │   ├── index.wxss  // 页面样式
├── utils/       // 工具函数
├── cloud/       // 云函数目录 (可选，若使用云开发)
└── project.config.json // 项目配置文件
```
---


### 环境准备
1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)。
2. 获取一个 **微信小程序 AppID** 以运行和部署。

### 项目运行
1. 克隆仓库到本地：
   ```bash
   git clone https://github.com/你的用户名/你的仓库名.git
2. 在微信开发者工具中打开项目。
3. 在 project.config.json 中配置您的 AppID。
4. 预览并运行小程序。


https://github.com/user-attachments/assets/61403576-4c00-4dac-b8c0-edb2ebef53fb

