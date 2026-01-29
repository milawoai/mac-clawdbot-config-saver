# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个 **ClawdBot 配置管理器**,用于管理 ClawdBot AI 助手的模型提供商配置、API Key 和缓存。

### 架构组成

- **后端服务** (`server.js`): Express.js REST API 服务器,运行在端口 8765
- **前端界面** (`public/index.html`): 单页面 HTML 应用,提供可视化配置界面
- **配置文件**: `~/.clawdbot/clawdbot.json` (由 ClawdBot 主服务使用)
- **本地缓存**: `./cache/*.json` (存储各提供商的 API Key)

### 支持的模型提供商

1. **Codex OAuth** - 使用 OAuth 认证,无需 API Key
2. **GLM/zai** - 智谱 AI,需要 `GLM_API_KEY`
3. **Moonshot** - 月之暗面,需要 `MOONSHOT_API_KEY`
4. **MiniMax** - 需要 `MINIMAX_API_KEY`

## 常用命令

### 启动开发服务器
```bash
npm start
# 或
node server.js
```

服务器将在 http://localhost:8765 启动

### VSCode 调试
使用 `.vscode/launch.json` 中预配置的调试配置:
- **启动服务器** - 直接调试 server.js
- **NPM Start** - 通过 npm 脚本启动

## API 接口说明

### 服务状态
- `GET /api/status` - 检查 ClawdBot 主服务 (端口 18789) 是否运行

### 配置管理
- `GET /api/config` - 读取 `~/.clawdbot/clawdbot.json`
- `POST /api/config` - 更新配置文件

### 缓存管理
- `GET /api/cache/:provider` - 读取指定提供商的缓存
- `POST /api/cache/:provider` - 保存提供商缓存
- `DELETE /api/cache/:provider` - 删除指定提供商缓存
- `DELETE /api/cache` - 清空所有缓存
- `GET /api/cache` - 列出所有缓存的提供商

### 其他
- `GET /open-config` - 返回 ClawdBot 配置页面 URL

## 代码架构要点

### 配置文件结构
配置文件 `~/.clawdbot/clawdbot.json` 的结构:
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
    "GLM_API_KEY": "...",
    "MOONSHOT_API_KEY": "...",
    "MINIMAX_API_KEY": "..."
  }
}
```

### 缓存文件结构
`./cache/{provider}.json`:
```json
{
  "apiKey": "...",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 前端工作流程
1. 检查 ClawdBot 服务状态 (端口 18789)
2. 加载配置文件
3. 选择模型提供商
4. 输入/缓存 API Key
5. 同步配置到文件 或 从文件读取到缓存

### 关键函数说明 (server.js)
- `getCachePath(provider)` - 生成缓存文件路径
- 所有路由使用 `try-catch` 进行错误处理,返回 JSON 响应

## Spec Workflow 模板系统

### 模板目录结构
- `.spec-workflow/templates/` - 默认模板(随版本更新)
- `.spec-workflow/user-templates/` - 自定义模板(覆盖默认)

### 可用模板
1. `requirements-template.md` - 需求文档
2. `design-template.md` - 设计文档
3. `tasks-template.md` - 任务文档
4. `product-template.md` - 产品指导
5. `tech-template.md` - 技术指导
6. `structure-template.md` - 结构指导

### 模板变量
- `{{projectName}}` - 项目名称
- `{{featureName}}` - 功能名称
- `{{date}}` - 当前日期
- `{{author}}` - 文档作者

## 开发注意事项

### 路径处理
- 配置文件路径使用 `os.homedir()` + `~/.clawdbot/`
- 缓存目录使用 `__dirname` + `cache/`
- 启动时自动创建 cache 目录

### 跨域和安全
- 服务器仅监听本地 localhost:8765
- 无跨域限制,仅限本地访问
- API Key 存储在本地缓存和配置文件中

### 错误处理
- 所有 API 端点都有 try-catch 包裹
- 配置文件不存在时返回 404
- 读写失败时返回 500 错误
