# 招募海报 · 一键生成

> 面向早期创业团队与校园组织的免费海报生成工具。点击代替写作，AI 填空润色，不编造内容。

## 项目状态

**MVP v0.1** — 当前为 mock 数据跑通完整 flow 的骨架版本，AI 生成部分为规则驱动（未接入真实 LLM）。

## 核心特性

- **点击式交互**：0 写作门槛，选择即可
- **反问式引导**：题目像有经验的同事在问你
- **AI 只填空润色**：基于你的选择拼接文案，不编造、不夸张
- **模板可编辑**：生成后仍可切换模板、改字，保持版式美观
- **企业级扁平设计**：简洁、专业、无 emoji

## 项目结构

```
recruit-poster/
├── packages/
│   ├── shared/              # 两端共享的数据层
│   │   └── src/
│   │       ├── types.ts     # 类型定义
│   │       ├── scenes.ts    # 场景配置（4 个场景）
│   │       ├── flows.ts     # 问答 flow 配置
│   │       ├── templates.ts # 模板配置（14 套）
│   │       └── mockAi.ts    # Mock AI 服务
│   ├── h5/                  # H5 网页端（React + TS + Vite）
│   │   ├── src/
│   │   │   ├── pages/       # 页面组件
│   │   │   ├── components/  # 通用组件
│   │   │   ├── store/       # 状态管理（Zustand）
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── tailwind.config.js
│   └── miniprogram/         # 原生微信小程序（骨架）
│       └── miniprogram/
│           ├── pages/       # 页面
│           ├── shared/      # shared 数据 JS 同步版
│           ├── app.js
│           └── app.json
├── docs/                    # 项目文档
├── package.json             # 根 package（npm workspaces）
├── .gitignore
└── LICENSE
```

## 技术选型

| 层级 | 选择 | 理由 |
|---|---|---|
| Monorepo | npm workspaces | 零额外依赖，原生支持 |
| H5 框架 | React 18 + TypeScript | 生态成熟、组件化清晰 |
| H5 构建 | Vite | 极快冷启动，现代前端标配 |
| 样式 | Tailwind CSS | 实用优先，利于保持扁平风格 |
| 状态 | Zustand | 轻量、无样板代码 |
| 路由 | React Router 6 | 简单够用 |
| 海报导出 | html-to-image | DOM 直接转 PNG，开发效率最高 |
| 小程序 | 原生微信小程序 | 官方文档清晰，后续接云函数更直接 |
| AI 接口 | 国内 LLM（通义千问 / 文心） | MVP 阶段先 mock，v0.3 接入 |

## 场景架构

**主场景：Startup 招聘**（7 步 flow）
1. 行业选择（8 类）
2. 团队阶段（4 级）
3. 岗位细分（8 选项）
4. 工作细节（工作方式、时长、薪资、地点）
5. 亮点勾选（9 个可选）
6. 补充信息（50 字以内）
7. 联系方式

**扩展场景**（各 5 步 flow）
- 社团招新
- 项目组队
- 活动招募

## 模板矩阵

MVP 共 14 套模板：

- Startup AI：classic + modern
- Startup SaaS：classic + modern
- Startup 消费：classic + modern
- Startup 游戏：classic + modern
- 社团招新：classic + modern
- 项目组队：classic + modern
- 活动招募：classic + modern

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### H5 端开发

```bash
# 安装依赖
npm install

# 启动 H5 开发服务
npm run dev:h5

# 浏览器打开 http://localhost:5173
```

### H5 端构建

```bash
npm run build:h5
# 产物在 packages/h5/dist/
```

### 小程序端开发

1. 打开微信开发者工具
2. 导入项目路径：`packages/miniprogram/`
3. 填入自己的 AppID（首次打开会提示）

> 小程序端当前为骨架版本，完整 flow 预计 v0.2 版本接入。

## 开发路线

- [x] v0.1 MVP：H5 端完整跑通（mock 数据）+ 小程序骨架
- [ ] v0.2：小程序端问答 flow + Canvas 海报导出
- [ ] v0.3：接入真实 LLM（通义千问）做文案润色
- [ ] v0.4：用户可编辑海报内容（生成后仍保留设计感）
- [ ] v0.5：模板市场扩充 + 社交裂变分享

## 设计原则

1. **点击代替写作**：选择比输入更轻
2. **AI 只填空润色**：不编造，不夸张，不假大空
3. **模板可编辑**：生成后仍保持版式美观
4. **企业级视觉**：简洁、扁平、无 emoji、正式专业

## 贡献

详见 [CONTRIBUTING.md](docs/CONTRIBUTING.md)。

## License

MIT © 2026
