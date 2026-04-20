/**
 * 全局类型定义
 */

// ==================== 场景 ====================
export type SceneId = 'startup' | 'club' | 'project' | 'event';

export interface Scene {
  id: SceneId;
  name: string;
  subtitle: string;
  description: string;
  flowSteps: string[]; // step id 列表，决定 flow 顺序
}

// ==================== Flow 问答 ====================
export type QuestionType =
  | 'single-choice' // 单选
  | 'multi-choice'  // 多选
  | 'text'          // 文本输入
  | 'structured';   // 结构化输入（多字段）

export interface Option {
  id: string;
  label: string;
  hint?: string;
  /** 选中后对模板/文案生成的影响（mock AI 会读取） */
  tags?: string[];
}

export interface StructuredField {
  key: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'number' | 'textarea';
  maxLength?: number;
}

export interface Question {
  id: string;
  title: string;       // 问题标题（反问式）
  subtitle?: string;   // 辅助说明
  type: QuestionType;
  required?: boolean;
  maxSelection?: number; // 多选上限
  maxLength?: number;    // 文本输入上限
  options?: Option[];
  fields?: StructuredField[]; // structured 类型用
}

// ==================== 模板 ====================
export type TemplateStyle = 'classic' | 'modern';
export type ExportRatio = '3:4' | '1:1' | 'long'; // 小红书竖图 / 朋友圈方图 / 微信群长图

export interface TemplatePalette {
  bg: string;
  surface: string;
  primary: string;
  text: string;
  textMuted: string;
  accent: string;
}

export interface Template {
  id: string;
  sceneId: SceneId;
  industryTag?: string; // startup 专有：ai/saas/consumer/game...
  style: TemplateStyle;
  name: string;
  palette: TemplatePalette;
  fontFamily: string;
}

// ==================== 用户输入与生成结果 ====================
export interface UserAnswers {
  [questionId: string]: string | string[] | Record<string, string>;
}

export interface GeneratedContent {
  headline: string;       // 主标题
  subheadline?: string;   // 副标题
  bullets: string[];      // 要点列表
  tags: string[];         // 亮点标签
  cta: string;            // 行动号召
  contact: string;        // 联系方式
  footer?: string;        // 页脚
}

export interface EditableContent extends GeneratedContent {
  // 编辑模式用的字段
}

export interface PosterData {
  scene: SceneId;
  template: Template;
  content: GeneratedContent;
  answers: UserAnswers;
}
