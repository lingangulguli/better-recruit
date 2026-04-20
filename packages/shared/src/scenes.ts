import type { Scene } from './types';

export const SCENES: Scene[] = [
  {
    id: 'startup',
    name: 'Startup 招聘',
    subtitle: '早期创业团队招人',
    description: '适合 0-1 阶段、Pre-A 轮、种子轮团队发布岗位',
    flowSteps: ['industry', 'stage', 'role', 'work-detail', 'highlights', 'supplement', 'contact'],
  },
  {
    id: 'club',
    name: '社团招新',
    subtitle: '校园社团/组织招新',
    description: '学生会、社团、兴趣小组、学术组织招收新成员',
    flowSteps: ['club-type', 'role', 'requirement', 'highlights', 'contact'],
  },
  {
    id: 'project',
    name: '项目组队',
    subtitle: '课程项目/比赛组队',
    description: '黑客松、课程大作业、比赛组队招人',
    flowSteps: ['project-type', 'role', 'timeline', 'highlights', 'contact'],
  },
  {
    id: 'event',
    name: '活动招募',
    subtitle: '活动志愿者/参与者',
    description: '讲座、比赛、workshop 招募参与者或志愿者',
    flowSteps: ['event-type', 'role', 'logistics', 'highlights', 'contact'],
  },
];

export function getScene(id: string): Scene | undefined {
  return SCENES.find(s => s.id === id);
}
