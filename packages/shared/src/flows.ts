import type { Question } from './types';

/**
 * Startup 招聘 Flow（7 步）
 */
export const startupFlow: Question[] = [
  {
    id: 'industry',
    title: '你的团队在哪个赛道？',
    subtitle: '这会影响海报的配色与文案风格',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'ai', label: 'AI / 大模型', tags: ['tech', 'cutting-edge'] },
      { id: 'saas', label: 'SaaS / 企业服务', tags: ['tech', 'professional'] },
      { id: 'consumer', label: '消费 / 电商', tags: ['warm', 'lifestyle'] },
      { id: 'game', label: '游戏 / 娱乐', tags: ['creative', 'energetic'] },
      { id: 'health', label: '医疗 / 健康', tags: ['trust', 'calm'] },
      { id: 'edu', label: '教育 / EdTech', tags: ['warm', 'professional'] },
      { id: 'hardware', label: '硬件 / 制造', tags: ['industrial'] },
      { id: 'other', label: '其他', tags: ['neutral'] },
    ],
  },
  {
    id: 'stage',
    title: '团队目前在哪个阶段？',
    subtitle: '帮你在海报里呈现合适的吸引点',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'idea', label: '想法阶段', hint: '0 到 1，还在验证' },
      { id: 'mvp', label: 'MVP / Demo', hint: '已有产品雏形' },
      { id: 'seed', label: '种子轮 / 天使轮', hint: '已融资或即将融资' },
      { id: 'prea', label: 'Pre-A 及以上', hint: '业务已跑起来' },
    ],
  },
  {
    id: 'role',
    title: '你要招什么岗位？',
    subtitle: '可多选，最多 3 个',
    type: 'multi-choice',
    required: true,
    maxSelection: 3,
    options: [
      { id: 'fe', label: '前端工程师' },
      { id: 'be', label: '后端工程师' },
      { id: 'algo', label: '算法工程师' },
      { id: 'product', label: '产品经理' },
      { id: 'designer', label: '设计师' },
      { id: 'ops', label: '运营 / 市场' },
      { id: 'bd', label: '商务 BD' },
      { id: 'other', label: '其他' },
    ],
  },
  {
    id: 'work-detail',
    title: '工作方式与待遇',
    type: 'structured',
    required: true,
    fields: [
      { key: 'workMode', label: '工作方式', placeholder: '远程 / 线下 / 混合', required: true },
      { key: 'duration', label: '时长', placeholder: '全职 / 实习 / 兼职', required: true },
      { key: 'salary', label: '薪资', placeholder: '例如 200-400/天 或面议' },
      { key: 'location', label: '地点', placeholder: '例如 北京 / 上海 / 不限' },
    ],
  },
  {
    id: 'highlights',
    title: '有哪些亮点想让候选人看到？',
    subtitle: '可多选，不超过 5 个',
    type: 'multi-choice',
    maxSelection: 5,
    options: [
      { id: 'remote-friendly', label: '远程友好' },
      { id: 'flexible-hours', label: '弹性工时' },
      { id: 'equity', label: '期权激励' },
      { id: 'mentor', label: '资深导师带' },
      { id: 'fast-growth', label: '快速成长' },
      { id: 'tech-stack', label: '技术栈新' },
      { id: 'real-impact', label: '真实业务影响' },
      { id: 'top-school', label: '团队背景强' },
      { id: 'funded', label: '已融资' },
    ],
  },
  {
    id: 'supplement',
    title: '还有什么想补充的？',
    subtitle: '可选，50 字以内。没有就跳过',
    type: 'text',
    maxLength: 50,
  },
  {
    id: 'contact',
    title: '候选人怎么找到你？',
    type: 'structured',
    required: true,
    fields: [
      { key: 'contactType', label: '联系方式类型', placeholder: '微信 / 邮箱 / 其他', required: true },
      { key: 'contactValue', label: '具体信息', placeholder: '微信号或邮箱', required: true },
      { key: 'note', label: '备注', placeholder: '例如 加好友请注明来意', type: 'textarea', maxLength: 30 },
    ],
  },
];

/**
 * 社团招新 Flow（5 步）
 */
export const clubFlow: Question[] = [
  {
    id: 'club-type',
    title: '你的社团是什么类型？',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'academic', label: '学术 / 研究' },
      { id: 'tech', label: '科技 / 编程' },
      { id: 'art', label: '艺术 / 文化' },
      { id: 'sport', label: '体育 / 户外' },
      { id: 'service', label: '公益 / 志愿' },
      { id: 'business', label: '商业 / 创业' },
      { id: 'other', label: '其他' },
    ],
  },
  {
    id: 'role',
    title: '要招什么职位？',
    type: 'multi-choice',
    required: true,
    maxSelection: 4,
    options: [
      { id: 'core', label: '核心成员' },
      { id: 'volunteer', label: '普通成员' },
      { id: 'tech', label: '技术部' },
      { id: 'pr', label: '宣传部' },
      { id: 'external', label: '外联部' },
      { id: 'other', label: '其他' },
    ],
  },
  {
    id: 'requirement',
    title: '对新成员有什么期待？',
    subtitle: '可多选，最多 4 个',
    type: 'multi-choice',
    maxSelection: 4,
    options: [
      { id: 'passionate', label: '热情投入' },
      { id: 'responsible', label: '有责任心' },
      { id: 'creative', label: '有想法' },
      { id: 'team', label: '团队协作' },
      { id: 'skill', label: '有相关技能' },
      { id: 'time', label: '时间充足' },
    ],
  },
  {
    id: 'highlights',
    title: '加入能获得什么？',
    type: 'multi-choice',
    maxSelection: 4,
    options: [
      { id: 'friends', label: '志同道合的朋友' },
      { id: 'skills', label: '技能提升' },
      { id: 'resource', label: '资源与人脉' },
      { id: 'credit', label: '社会实践学分' },
      { id: 'event', label: '丰富活动' },
      { id: 'certificate', label: '证书与推荐' },
    ],
  },
  {
    id: 'contact',
    title: '感兴趣的人怎么报名？',
    type: 'structured',
    required: true,
    fields: [
      { key: 'contactType', label: '联系方式类型', placeholder: '微信 / 问卷链接', required: true },
      { key: 'contactValue', label: '具体信息', placeholder: '微信号或链接', required: true },
      { key: 'deadline', label: '截止时间', placeholder: '例如 10 月 20 日' },
    ],
  },
];

/**
 * 项目组队 Flow（5 步）
 */
export const projectFlow: Question[] = [
  {
    id: 'project-type',
    title: '什么类型的项目？',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'hackathon', label: '黑客松 / Hackathon' },
      { id: 'course', label: '课程大作业' },
      { id: 'competition', label: '学科比赛' },
      { id: 'research', label: '研究项目' },
      { id: 'startup', label: '早期创业 Idea' },
      { id: 'other', label: '其他' },
    ],
  },
  {
    id: 'role',
    title: '还缺什么角色？',
    type: 'multi-choice',
    required: true,
    maxSelection: 4,
    options: [
      { id: 'fe', label: '前端' },
      { id: 'be', label: '后端' },
      { id: 'algo', label: '算法' },
      { id: 'designer', label: '设计' },
      { id: 'pm', label: '产品' },
      { id: 'writer', label: '文档/汇报' },
      { id: 'domain', label: '领域专家' },
    ],
  },
  {
    id: 'timeline',
    title: '项目时间线',
    type: 'structured',
    required: true,
    fields: [
      { key: 'startDate', label: '开始时间', placeholder: '例如 本周末' },
      { key: 'endDate', label: '截止时间', placeholder: '例如 一个月后' },
      { key: 'commitment', label: '每周投入', placeholder: '例如 10 小时/周' },
    ],
  },
  {
    id: 'highlights',
    title: '项目的吸引点是什么？',
    type: 'multi-choice',
    maxSelection: 4,
    options: [
      { id: 'prize', label: '有奖金/奖品' },
      { id: 'portfolio', label: '可进作品集' },
      { id: 'mentor', label: '有导师指导' },
      { id: 'learning', label: '能学到新东西' },
      { id: 'team-strong', label: '队友背景强' },
      { id: 'fun', label: '纯粹好玩' },
    ],
  },
  {
    id: 'contact',
    title: '怎么联系你？',
    type: 'structured',
    required: true,
    fields: [
      { key: 'contactType', label: '联系方式类型', placeholder: '微信', required: true },
      { key: 'contactValue', label: '具体信息', placeholder: '微信号', required: true },
    ],
  },
];

/**
 * 活动招募 Flow（5 步）
 */
export const eventFlow: Question[] = [
  {
    id: 'event-type',
    title: '什么类型的活动？',
    type: 'single-choice',
    required: true,
    options: [
      { id: 'talk', label: '讲座 / 分享' },
      { id: 'workshop', label: 'Workshop / 工作坊' },
      { id: 'competition', label: '比赛' },
      { id: 'networking', label: '社交 / Networking' },
      { id: 'volunteer', label: '志愿活动' },
      { id: 'other', label: '其他' },
    ],
  },
  {
    id: 'role',
    title: '招什么样的人？',
    type: 'multi-choice',
    required: true,
    maxSelection: 3,
    options: [
      { id: 'participant', label: '参与者' },
      { id: 'volunteer', label: '志愿者' },
      { id: 'speaker', label: '分享嘉宾' },
      { id: 'organizer', label: '组织者' },
    ],
  },
  {
    id: 'logistics',
    title: '活动信息',
    type: 'structured',
    required: true,
    fields: [
      { key: 'date', label: '时间', placeholder: '例如 10 月 25 日 下午', required: true },
      { key: 'location', label: '地点', placeholder: '例如 线上 / 某教学楼', required: true },
      { key: 'cost', label: '费用', placeholder: '免费 / XX 元' },
    ],
  },
  {
    id: 'highlights',
    title: '活动亮点',
    type: 'multi-choice',
    maxSelection: 4,
    options: [
      { id: 'free', label: '免费参与' },
      { id: 'food', label: '提供餐饮' },
      { id: 'gift', label: '有礼品' },
      { id: 'certificate', label: '发放证书' },
      { id: 'celebrity', label: '大咖参与' },
      { id: 'networking', label: '社交机会' },
    ],
  },
  {
    id: 'contact',
    title: '怎么报名？',
    type: 'structured',
    required: true,
    fields: [
      { key: 'contactType', label: '报名方式', placeholder: '问卷 / 微信', required: true },
      { key: 'contactValue', label: '具体链接/信息', placeholder: '链接或微信号', required: true },
      { key: 'deadline', label: '报名截止', placeholder: '例如 10 月 23 日' },
    ],
  },
];

export const FLOW_MAP: Record<string, Question[]> = {
  startup: startupFlow,
  club: clubFlow,
  project: projectFlow,
  event: eventFlow,
};

export function getFlow(sceneId: string): Question[] {
  return FLOW_MAP[sceneId] ?? [];
}
