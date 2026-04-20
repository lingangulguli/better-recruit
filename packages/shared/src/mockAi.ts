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
 * 使用后端 API 生成文案
 * 后端会安全地调用 DeepSeek API
 */
async function callLLMAPI(prompt: string): Promise<string> {
  try {
    const response = await fetch('http://localhost:3001/api/llm/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      console.warn(`LLM API error: ${response.status}`);
      return '';
    }

    const data = await response.json();
    return data.content || '';
  } catch (error) {
    console.warn('LLM API call failed:', error);
    return '';
  }
}

/**
 * 构建提示词
 */
function buildPrompt(scene: SceneId, answers: UserAnswers): string {
  const industryId = pickString(answers.industry);
  const stageId = pickString(answers.stage);
  const roles = pickArray(answers.role);
  const detail = pickRecord(answers['work-detail']);
  const highlights = pickArray(answers.highlights);
  const supplement = pickString(answers.supplement);
  const contact = pickRecord(answers.contact);

  let prompt = '';

  switch (scene) {
    case 'startup': {
      const industryLabel = labelOf('industry', industryId, 'startup');
      const stageLabel = labelOf('stage', stageId, 'startup');
      const roleLabels = roles.map(r => labelOf('role', r, 'startup'));
      const highlightLabels = highlights.map(h => labelOf('highlights', h, 'startup'));

      prompt = `生成一份创业公司招聘海报文案，包含以下信息：
- 招聘岗位：${roleLabels.join('、')}
- 行业：${industryLabel}
- 融资阶段：${stageLabel}
- 工作方式：${detail.workMode || '未指定'}
- 薪资范围：${detail.salary || '未指定'}
- 工作地点：${detail.location || '未指定'}
- 公司亮点：${highlightLabels.join('、')}
- 补充说明：${supplement || '暂无'}

请生成一份吸引力强的招聘文案，包括主标题、副标题、要点列表和行动号召。`;
      break;
    }
    case 'club': {
      const clubType = labelOf('club-type', pickString(answers['club-type']), 'club');
      const roleLabels = roles.map(r => labelOf('role', r, 'club'));
      const reqLabels = pickArray(answers.requirement).map(r => labelOf('requirement', r, 'club'));
      const highlightLabels = highlights.map(h => labelOf('highlights', h, 'club'));

      prompt = `生成一份校园社团招新海报文案，包含以下信息：
- 社团类型：${clubType}
- 招募职位：${roleLabels.join('、')}
- 期待的成员：${reqLabels.join('、')}
- 社团亮点：${highlightLabels.join('、')}
- 报名截止：${contact.deadline || '未指定'}

请生成一份有趣、吸引学生的招新文案。`;
      break;
    }
    case 'project': {
      const projectType = labelOf('project-type', pickString(answers['project-type']), 'project');
      const roleLabels = roles.map(r => labelOf('role', r, 'project'));
      const timeline = pickRecord(answers.timeline);
      const highlightLabels = highlights.map(h => labelOf('highlights', h, 'project'));

      prompt = `生成一份项目组队海报文案，包含以下信息：
- 项目类型：${projectType}
- 缺少的岗位：${roleLabels.join('、')}
- 项目时间：${timeline.startDate} 至 ${timeline.endDate}
- 所需投入：${timeline.commitment || '未指定'}
- 项目亮点：${highlightLabels.join('、')}

请生成一份激励人心的组队文案。`;
      break;
    }
    case 'event': {
      const eventType = labelOf('event-type', pickString(answers['event-type']), 'event');
      const roleLabels = roles.map(r => labelOf('role', r, 'event'));
      const logistics = pickRecord(answers.logistics);
      const highlightLabels = highlights.map(h => labelOf('highlights', h, 'event'));

      prompt = `生成一份活动招募海报文案，包含以下信息：
- 活动类型：${eventType}
- 招募角色：${roleLabels.join('、')}
- 活动时间：${logistics.date || '未指定'}
- 活动地点：${logistics.location || '未指定'}
- 活动费用：${logistics.cost || '未指定'}
- 报名截止：${contact.deadline || '未指定'}
- 活动亮点：${highlightLabels.join('、')}

请生成一份能吸引参与者的活动招募文案。`;
      break;
    }
  }

  return prompt;
}

/**
 * 主入口：按场景生成海报文案
 * 签名与未来真实 LLM 服务保持一致，便于无缝替换。
 */
export async function mockGenerate(
  scene: SceneId,
  answers: UserAnswers,
): Promise<GeneratedContent> {
  // 尝试调用 LLM API（后端会调用 DeepSeek）
  const prompt = buildPrompt(scene, answers);
  const aiContent = await callLLMAPI(prompt);

  // 如果 API 调用成功，解析 AI 返回的内容
  if (aiContent) {
    try {
      // 尝试解析 AI 返回的结构化内容
      const content = parseAIContent(aiContent, scene);
      if (content) return content;
    } catch (err) {
      console.error('Failed to parse AI content:', err);
    }
  }

  // API 失败或解析失败时，回退到本地规则生成
  console.log('🔄 Falling back to local generation');
  await new Promise(r => setTimeout(r, 400));

  switch (scene) {
    case 'startup': return generateStartup(answers);
    case 'club':    return generateClub(answers);
    case 'project': return generateProject(answers);
    case 'event':   return generateEvent(answers);
  }
}

/**
 * 清理文本中的 markdown 和 latex 格式符号
 */
function cleanFormatting(text: string): string {
  if (!text) return '';
  
  return text
    // 移除 markdown 粗体 (**text** 或 __text__)
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    // 移除 markdown 斜体 (*text* 或 _text_)
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/_(.+?)_/g, '$1')
    // 移除 markdown 代码 (`text`)
    .replace(/`(.+?)`/g, '$1')
    // 移除 LaTeX 公式符号 ($$...$$ 或 $...$)
    .replace(/\$\$(.+?)\$\$/g, '$1')
    .replace(/\$(.+?)\$/g, '$1')
    // 移除行首的 markdown 标题符号和列表符号
    .replace(/^[#\*\-\+\s]+/, '')
    // 移除中文格式符号
    .replace(/·/g, '')
    .replace(/·/g, '')
    // 移除多余空格
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 解析 AI 返回的内容为结构化格式
 */
function parseAIContent(content: string, scene: SceneId): GeneratedContent | null {
  try {
    // 尝试从返回内容中提取信息
    const lines = content.split('\n').filter(l => l.trim());
    if (lines.length < 2) return null;

    const headline = cleanFormatting(lines[0]).trim();
    const subheadline = lines.length > 1 ? cleanFormatting(lines[1]).trim() : '';
    
    const bullets: string[] = [];
    const tags: string[] = [];
    let cta = '感兴趣的朋友欢迎来聊';
    let contact = '';

    // 提取要点（通常是以 - 或 * 开头的行）
    for (let i = 2; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('-') || line.startsWith('*')) {
        const bullet = cleanFormatting(line.replace(/^[-*]\s*/, ''));
        if (bullet) bullets.push(bullet);
      }
    }

    // 设置默认的 CTA
    switch (scene) {
      case 'startup':
        cta = '感兴趣的朋友欢迎来聊';
        break;
      case 'club':
        cta = '期待和你一起';
        break;
      case 'project':
        cta = '一起来做点东西';
        break;
      case 'event':
        cta = '期待见到你';
        break;
    }

    return {
      headline,
      subheadline,
      bullets: bullets.length > 0 ? bullets : [subheadline],
      tags,
      cta,
      contact,
    };
  } catch (err) {
    console.error('Parse error:', err);
    return null;
  }
}
