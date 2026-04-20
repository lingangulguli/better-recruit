# 架构概览

## 整体拓扑

```
┌─────────────────────────────────────┐
│           @recruit-poster/shared    │
│  types · scenes · flows · templates │
│           mockAi (未来 → llmApi)     │
└──────────────┬──────────────────────┘
               │ (TS 源码引用)
        ┌──────┴───────┐
        ▼              ▼
   ┌─────────┐    ┌──────────┐
   │   H5    │    │小程序端  │
   │  React  │    │ Native   │
   │  Vite   │    │ WXML/WXSS│
   └─────────┘    └──────────┘
```

## 数据流

```
用户点击场景 → 进入 Flow 页
      ↓
按顺序回答问题（答案存 Zustand）
      ↓
最后一题点击 → 调用 mockGenerate(sceneId, answers)
      ↓
返回 GeneratedContent
      ↓
PreviewPage 渲染 Poster 组件
      ↓
用户切换模板/尺寸
      ↓
html-to-image 导出 PNG
```

## 核心类型

```typescript
Scene       // 场景定义
Question    // 单个问题（single/multi/text/structured）
Template    // 模板（palette + fontFamily）
UserAnswers // 用户答案存储
GeneratedContent // AI 生成的文案结构
```

## 模板渲染

海报 Poster 组件接收 `template + content + ratio`，内部以 **1080 宽** 的绝对像素渲染。
预览页用 CSS `transform: scale()` 缩小展示；导出时 `html-to-image` 直接对原尺寸 DOM 做 2x pixel ratio 导出，保证图片清晰。

## Mock → 真实 AI 的替换路径

当前 `mockAi.ts` 导出 `mockGenerate(scene, answers): Promise<GeneratedContent>`。
未来接入 LLM 时，只需新建 `llmApi.ts`，保持同样签名：

```typescript
export async function llmGenerate(scene, answers): Promise<GeneratedContent> {
  // 1. 构造 prompt
  // 2. 调云函数（避免 key 泄露）
  // 3. 解析为 GeneratedContent
}
```

然后在各端的调用点替换即可，UI 层零改动。

## 小程序与 H5 的共享

- shared 包的 TS 源码被 H5 通过 vite alias 直接引用（无需构建）
- 小程序端原生不支持 npm workspaces 和 ESM 源码引用，shared 数据以 JS 形式同步一份到 `miniprogram/shared/*.js`
- 未来可选方案：用 gulp / 脚本从 `packages/shared/src/*.ts` 自动生成 `miniprogram/shared/*.js`，避免手工同步
