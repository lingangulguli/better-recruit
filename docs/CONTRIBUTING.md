# 贡献指南

## 分支策略

- `main`：稳定版本，永远可发布
- `dev`：开发主线，新功能从此切出
- `feature/<name>`：具体功能开发
- `fix/<name>`：Bug 修复

## Commit 规范

采用语义化 commit：

```
<type>: <subject>

[可选 body]
```

**type 枚举**：

| type | 说明 |
|---|---|
| feat | 新功能 |
| fix | Bug 修复 |
| docs | 文档 |
| style | 代码格式（不影响功能） |
| refactor | 重构 |
| perf | 性能优化 |
| chore | 构建、依赖等杂项 |

**示例**：

```
feat: 增加社团招新场景模板
fix: 修复多选上限判断错误
docs: 更新 README 场景架构说明
```

## 开发流程

1. Fork / clone 仓库
2. 从 `dev` 切出 feature 分支：`git checkout -b feature/my-feature`
3. 开发并提交，commit message 遵循上述规范
4. 推送到远程：`git push origin feature/my-feature`
5. 发起 Pull Request 到 `dev`

## 代码风格

- TypeScript 严格模式，所有新代码必须通过 tsc 类型检查
- 文件、变量、函数命名用英文；注释和文案用中文
- 不使用 emoji（产品视觉原则）
- 所有输出文案避免破折号（em dash / en dash），用括号或逗号替代

## 目录约定

- 场景 flow 配置改动在 `packages/shared/src/flows.ts`
- 模板样式改动在 `packages/shared/src/templates.ts`
- H5 端页面在 `packages/h5/src/pages/`
- H5 端通用组件在 `packages/h5/src/components/`
- 小程序端页面在 `packages/miniprogram/miniprogram/pages/`

## 如何添加一个新场景

1. 在 `shared/scenes.ts` 增加 scene 定义
2. 在 `shared/flows.ts` 增加对应的 Question 列表
3. 在 `shared/templates.ts` 增加至少 2 套模板
4. 在 `shared/mockAi.ts` 增加对应的 generator 函数
5. 在 `shared/mockAi.ts` 的 `mockGenerate` switch 中加 case

## 如何添加一套新模板

1. 在 `shared/templates.ts` 的 `TEMPLATES` 数组中增加一个 Template 对象
2. 调色板遵循"企业级扁平"原则：
   - 1 个主色 + 1 个 accent
   - 饱和度克制
   - 明度对比清晰
3. 模板 id 命名：`<sceneId>-<industryTag?>-<style>`
