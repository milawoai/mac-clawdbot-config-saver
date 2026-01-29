# ClawdBot 配置管理器

一个用于管理 ClawdBot AI 助手模型提供商配置、API Key 和缓存的 Web 界面工具。

![ClawdBot 配置管理器](https://img.shields.io/badge/ClawdBot-配置管理器-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-要求-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## ✨ 特性

- 🌐 **Web 界面** - 提供直观的可视化配置界面
- 🔧 **多提供商支持** - 支持 Codex、GLM、Moonshot、MiniMax
- 💾 **本地缓存** - 安全存储 API Key 到本地缓存
- 📁 **配置同步** - 自动同步配置到 ClawdBot 主服务
- 🔍 **状态监控** - 实时检查服务运行状态

## 🏗️ 架构

```
ClawdBot 配置管理器
├── 后端服务 (server.js)     # Express.js REST API 服务器
├── 前端界面 (public/)        # 单页面 HTML 应用
├── 配置文件 (~/.clawdbot/)    # ClawdBot 主配置文件
└── 本地缓存 (./cache/)        # API Key 本地缓存
```

## 📦 安装依赖

```bash
npm install
```

## 🚀 快速开始

### 1. 启动开发服务器

```bash
npm start
# 或者
node server.js
```

### 2. 访问 Web 界面

打开浏览器访问：http://localhost:8765

### 3. 配置模型提供商

1. 选择您要使用的模型提供商
2. 输入对应的 API Key
3. 选择缓存或直接同步配置

## 🔑 支持的模型提供商

| 提供商 | 认证方式 | 需要 API Key | 描述 |
|--------|---------|-------------|------|
| **Codex OAuth** | OAuth | ❌ | 使用 GitHub 账号授权 |
| **GLM/zai** | API Key | ✅ | 智谱 AI 提供 |
| **Moonshot** | API Key | ✅ | 月之暗面提供 |
| **MiniMax** | API Key | ✅ | MiniMax 提供 |
| **OpenRouter** | API Key | ✅ | OpenRouter 提供 |

## 📡 API 接口

### 服务状态
- `GET /api/status` - 检查 ClawdBot 主服务状态

### 配置管理
- `GET /api/config` - 读取配置文件
- `POST /api/config` - 更新配置文件

### 缓存管理
- `GET /api/cache/:provider` - 读取指定提供商的缓存
- `POST /api/cache/:provider` - 保存提供商缓存
- `DELETE /api/cache/:provider` - 删除指定提供商缓存
- `DELETE /api/cache` - 清空所有缓存
- `GET /api/cache` - 列出所有缓存的提供商

### 实用工具
- `GET /open-config` - 返回 ClawdBot 配置页面 URL

## 📝 配置文件结构

### 主配置文件 (~/.clawdbot/clawdbot.json)

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "codex|glm|moonshot|minimax"
      }
    }
  },
  "env": {
    "GLM_API_KEY": "your_glm_api_key",
    "MOONSHOT_API_KEY": "your_moonshot_api_key",
    "MINIMAX_API_KEY": "your_minimax_api_key"
  }
}
```

### 缓存文件结构 (./cache/{provider}.json)

```json
{
  "apiKey": "your_api_key",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🛠️ 开发指南

### VSCode 调试

项目已预配置 VSCode 调试选项：

- **启动服务器** - 直接调试 server.js
- **NPM Start** - 通过 npm 脚本启动

### 文件结构说明

```
.
├── server.js              # 主服务器文件
├── public/
│   └── index.html         # 前端界面
├── cache/                 # 缓存目录 (自动创建)
├── .spec-workflow/        # Spec 模板目录
└── README.md              # 项目文档
```

## 🔒 安全特性

- **本地存储** - 所有配置和缓存仅存储在本地
- **无跨域** - 仅允许本地访问 (localhost:8765)
- **安全传输** - API Key 不会通过网络传输

## 📊 使用流程

1. **检查服务状态** - 确认 ClawdBot 主服务运行正常
2. **加载配置** - 从 ~/.clawdbot/clawdbot.json 读取现有配置
3. **选择提供商** - 从下拉菜单选择所需的模型提供商
4. **输入凭据** - 输入 API Key 或使用 OAuth 授权
5. **选择操作** - 选择缓存 API Key 或直接同步到配置文件
6. **应用配置** - 保存更改并应用到 ClawdBot 服务

## 🐛 故障排除

### 常见问题

**Q: 无法访问 Web 界面**
- 确认服务器已启动：`npm start`
- 检查端口 8765 是否被占用
- 确认防火墙未阻止 localhost 连接

**Q: 配置同步失败**
- 检查 ~/.clawdbot/ 目录是否存在
- 确认文件读写权限
- 查看服务器控制台错误信息

**Q: API Key 缓存失败**
- 确认 ./cache/ 目录存在且可写
- 检查磁盘空间是否充足

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如需帮助，请提交 GitHub Issue 或联系项目维护者。

---

**ClawdBot 配置管理器** - 让 AI 模型配置更简单！ 🚀