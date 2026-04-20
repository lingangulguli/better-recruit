import type { GeneratedContent, SceneId, UserAnswers } from './types';
import { getFlow } from './flows';

/**
 * Mock AI 服务：
 * 基于用户选择拼接文案，规则驱动，无幻觉、无编造。
 * 后续会被真正的 LLM 服务替换（接口签名保持一致）。
 */

function pickString(v: unknown): string {
  if (typeof v === 'string') return v.trim();
  return '';
}

function pickArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  return [];
}

function pickRecord(v: unknown): Record<string, string> {
  if (v && typeof v === 'object' && !Array.isArray(v)) return v as Record<string, string>;
  return {};
}

function labelOf(questionId: string, optionId: string, sceneId: SceneId): string {
  const flow = getFlow(sceneId);
  const q = flow.find(x => x.id === questionId);
  return q?.options?.find(o => o.id === optionId)?.label ?? optionId;
}

// -------------------- 各场景生成器 --------------------

function generateStartup(answers: UserAnswers): GeneratedContent {
  const industryId = pickString(answers.industry);
  const stageId = pickString(answers.stage);
  const roles = pickArray(answers.role).map(r => labelOf('role', r, 'startup'));
  const detail = pickRecord(answers['work-detail']);
  const highlights = pickArray(answers.highlights).map(h => labelOf('highlights', h, 'startup'));
  const supplement = pickString(answers.supplement);
  const contact = pickRecord(answers.contact);

  const industryLabel = labelOf('industry', industryId, 'startup');
  const stageLabel = labelOf('stage', stageId, 'startup');

  const headline = roles.length > 0
    ? `寻找 ${roles.join(' / ')}`
    : '我们在招人';

  const subheadline = `一家 ${industryLabel} 方向的团队，目前 ${stageLabel}`;

  const bullets: string[] = [];
  if (detail.workMode) bullets.push(`工作方式：${detail.workMode}`);
  if (detail.duration) bullets.push(`时长：${detail.duration}`);
  if (detail.salary) bullets.push(`薪资：${detail.salary}`);
  if (detail.location) bullets.push(`地点：${detail.location}`);
  if (supplement) bullets.push(supplement);

  const cta = '感兴趣的朋友欢迎来聊';
  const contactStr = contact.contactType && contact.contactValue
    ? `${contact.contactType}：${contact.contactValue}${contact.note ? `（${contact.note}）` : ''}`
    : '';

  return {
    headline,
    subheadline,
    bullets,
    tags: highlights,
    cta,
    contact: contactStr,
  };
}

function generateClub(answers: UserAnswers): GeneratedContent {
  const clubType = labelOf('club-type', pickString(answers['club-type']), 'club');
  const roles = pickArray(answers.role).map(r => labelOf('role', r, 'club'));
  const reqs = pickArray(answers.requirement).map(r => labelOf('requirement', r, 'club'));
  const highlights = pickArray(answers.highlights).map(h => labelOf('highlights', h, 'club'));
  const contact = pickRecord(answers.contact);

  const headline = '我们在招新';
  const subheadline = `${clubType} 类社团`;
  const bullets: string[] = [];
  if (roles.length) bullets.push(`招募职位：${roles.join('、')}`);
  if (reqs.length) bullets.push(`期待你是：${reqs.join('、')}`);
  if (contact.deadline) bullets.push(`报名截止：${contact.deadline}`);

  const contactStr = contact.contactType && contact.contactValue
    ? `${contact.contactType}：${contact.contactValue}`
    : '';

  return {
    headline,
    subheadline,
    bullets,
    tags: highlights,
    cta: '期待和你一起',
    contact: contactStr,
  };
}

function generateProject(answers: UserAnswers): GeneratedContent {
  const projectType = labelOf('project-type', pickString(answers['project-type']), 'project');
  const roles = pickArray(answers.role).map(r => labelOf('role', r, 'project'));
  const timeline = pickRecord(answers.timeline);
  const highlights = pickArray(answers.highlights).map(h => labelOf('highlights', h, 'project'));
  const contact = pickRecord(answers.contact);

  const headline = '项目组队';
  const subheadline = `${projectType}${roles.length ? `｜缺 ${roles.join(' / ')}` : ''}`;

  const bullets: string[] = [];
  if (timeline.startDate || timeline.endDate) {
    bullets.push(`时间：${timeline.startDate || ''}${timeline.endDate ? ` 至 ${timeline.endDate}` : ''}`.trim());
  }
  if (timeline.commitment) bullets.push(`投入：${timeline.commitment}`);

  const contactStr = contact.contactType && contact.contactValue
    ? `${contact.contactType}：${contact.contactValue}`
    : '';

  return {
    headline,
    subheadline,
    bullets,
    tags: highlights,
    cta: '一起来做点东西',
    contact: contactStr,
  };
}

function generateEvent(answers: UserAnswers): GeneratedContent {
  const eventType = labelOf('event-type', pickString(answers['event-type']), 'event');
  const roles = pickArray(answers.role).map(r => labelOf('role', r, 'event'));
  const logistics = pickRecord(answers.logistics);
  const highlights = pickArray(answers.highlights).map(h => labelOf('highlights', h, 'event'));
  const contact = pickRecord(answers.contact);

  const headline = '活动招募中';
  const subheadline = `${eventType}${roles.length ? `｜招 ${roles.join('、')}` : ''}`;

  const bullets: string[] = [];
  if (logistics.date) bullets.push(`时间：${logistics.date}`);
  if (logistics.location) bullets.push(`地点：${logistics.location}`);
  if (logistics.cost) bullets.push(`费用：${logistics.cost}`);
  if (contact.deadline) bullets.push(`报名截止：${contact.deadline}`);

  const contactStr = contact.contactType && contact.contactValue
    ? `报名：${contact.contactValue}`
    : '';

  return {
    headline,
    subheadline,
    bullets,
    tags: highlights,
    cta: '期待见到你',
    contact: contactStr,
  };
}

/**
 * 主入口：按场景生成海报文案
 * 签名与未来真实 LLM 服务保持一致，便于无缝替换。
 */
export async function mockGenerate(
  scene: SceneId,
  answers: UserAnswers,
): Promise<GeneratedContent> {
  // 模拟网络延迟，UI 层能看到 loading 状态
  await new Promise(r => setTimeout(r, 400));

  switch (scene) {
    case 'startup': return generateStartup(answers);
    case 'club':    return generateClub(answers);
    case 'project': return generateProject(answers);
    case 'event':   return generateEvent(answers);
  }
}
