import type { Template } from './types';

/**
 * 模板调色板遵循"企业级扁平"原则：
 * - 明度对比清晰
 * - 饱和度克制
 * - 主色只用 1 个 + 1 个 accent 点缀
 * - 不使用 emoji
 */
export const TEMPLATES: Template[] = [
  // ============ Startup AI / 大模型 ============
  {
    id: 'startup-ai-classic',
    sceneId: 'startup',
    industryTag: 'ai',
    style: 'classic',
    name: 'AI · 经典',
    palette: {
      bg: '#0B1220',
      surface: '#121A2B',
      primary: '#5B8CFF',
      text: '#F5F7FA',
      textMuted: '#9CA8BD',
      accent: '#4FD1C5',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  {
    id: 'startup-ai-modern',
    sceneId: 'startup',
    industryTag: 'ai',
    style: 'modern',
    name: 'AI · 现代',
    palette: {
      bg: '#FAFAFA',
      surface: '#FFFFFF',
      primary: '#1E40AF',
      text: '#0F172A',
      textMuted: '#64748B',
      accent: '#0891B2',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  // ============ Startup SaaS ============
  {
    id: 'startup-saas-classic',
    sceneId: 'startup',
    industryTag: 'saas',
    style: 'classic',
    name: 'SaaS · 经典',
    palette: {
      bg: '#F7F9FC',
      surface: '#FFFFFF',
      primary: '#2563EB',
      text: '#1A202C',
      textMuted: '#64748B',
      accent: '#7C3AED',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  {
    id: 'startup-saas-modern',
    sceneId: 'startup',
    industryTag: 'saas',
    style: 'modern',
    name: 'SaaS · 现代',
    palette: {
      bg: '#FFFFFF',
      surface: '#F1F5F9',
      primary: '#0F172A',
      text: '#0F172A',
      textMuted: '#475569',
      accent: '#2563EB',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  // ============ Startup 消费 / 电商 ============
  {
    id: 'startup-consumer-classic',
    sceneId: 'startup',
    industryTag: 'consumer',
    style: 'classic',
    name: '消费 · 经典',
    palette: {
      bg: '#FFF8F2',
      surface: '#FFFFFF',
      primary: '#C2410C',
      text: '#1C1917',
      textMuted: '#78716C',
      accent: '#D97706',
    },
    fontFamily: '"PingFang SC", "Noto Serif SC", serif',
  },
  {
    id: 'startup-consumer-modern',
    sceneId: 'startup',
    industryTag: 'consumer',
    style: 'modern',
    name: '消费 · 现代',
    palette: {
      bg: '#FEF3F2',
      surface: '#FFFFFF',
      primary: '#E11D48',
      text: '#18181B',
      textMuted: '#71717A',
      accent: '#F59E0B',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  // ============ Startup 游戏 / 娱乐 ============
  {
    id: 'startup-game-classic',
    sceneId: 'startup',
    industryTag: 'game',
    style: 'classic',
    name: '游戏 · 经典',
    palette: {
      bg: '#0F0A19',
      surface: '#1A1029',
      primary: '#A855F7',
      text: '#F5F3FF',
      textMuted: '#A1A1AA',
      accent: '#EC4899',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  {
    id: 'startup-game-modern',
    sceneId: 'startup',
    industryTag: 'game',
    style: 'modern',
    name: '游戏 · 现代',
    palette: {
      bg: '#18181B',
      surface: '#27272A',
      primary: '#F97316',
      text: '#FAFAFA',
      textMuted: '#A1A1AA',
      accent: '#FACC15',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  // ============ 社团招新 ============
  {
    id: 'club-classic',
    sceneId: 'club',
    style: 'classic',
    name: '社团 · 经典',
    palette: {
      bg: '#FDFBF7',
      surface: '#FFFFFF',
      primary: '#C2410C',
      text: '#1C1917',
      textMuted: '#78716C',
      accent: '#0F766E',
    },
    fontFamily: '"PingFang SC", "Noto Serif SC", serif',
  },
  {
    id: 'club-modern',
    sceneId: 'club',
    style: 'modern',
    name: '社团 · 现代',
    palette: {
      bg: '#F0FDFA',
      surface: '#FFFFFF',
      primary: '#0F766E',
      text: '#134E4A',
      textMuted: '#5E6B6E',
      accent: '#F59E0B',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  // ============ 项目组队 ============
  {
    id: 'project-classic',
    sceneId: 'project',
    style: 'classic',
    name: '项目 · 经典',
    palette: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      primary: '#1D4ED8',
      text: '#0F172A',
      textMuted: '#64748B',
      accent: '#059669',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  {
    id: 'project-modern',
    sceneId: 'project',
    style: 'modern',
    name: '项目 · 现代',
    palette: {
      bg: '#0F172A',
      surface: '#1E293B',
      primary: '#38BDF8',
      text: '#F1F5F9',
      textMuted: '#94A3B8',
      accent: '#22D3EE',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  // ============ 活动招募 ============
  {
    id: 'event-classic',
    sceneId: 'event',
    style: 'classic',
    name: '活动 · 经典',
    palette: {
      bg: '#FEF9C3',
      surface: '#FFFFFF',
      primary: '#B45309',
      text: '#1C1917',
      textMuted: '#78716C',
      accent: '#DC2626',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
  {
    id: 'event-modern',
    sceneId: 'event',
    style: 'modern',
    name: '活动 · 现代',
    palette: {
      bg: '#FFFFFF',
      surface: '#F9FAFB',
      primary: '#111827',
      text: '#111827',
      textMuted: '#6B7280',
      accent: '#EF4444',
    },
    fontFamily: '"PingFang SC", "Inter", sans-serif',
  },
];

export function getTemplatesByScene(sceneId: string): Template[] {
  return TEMPLATES.filter(t => t.sceneId === sceneId);
}

export function getTemplatesByIndustry(sceneId: string, industryTag?: string): Template[] {
  const pool = getTemplatesByScene(sceneId);
  if (!industryTag) return pool;
  const matched = pool.filter(t => t.industryTag === industryTag);
  return matched.length > 0 ? matched : pool;
}

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find(t => t.id === id);
}
