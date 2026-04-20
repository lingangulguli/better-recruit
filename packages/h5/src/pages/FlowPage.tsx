import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getFlow,
  getScene,
  mockGenerate,
  type Question,
  type SceneId,
} from '@recruit-poster/shared';
import { useFlowStore } from '../store/flowStore';
import QuestionCard from '../components/flow/QuestionCard';
import ProgressBar from '../components/flow/ProgressBar';

export default function FlowPage() {
  const { sceneId } = useParams<{ sceneId: string }>();
  const navigate = useNavigate();

  const scene = sceneId ? getScene(sceneId) : undefined;
  const questions: Question[] = useMemo(() => (sceneId ? getFlow(sceneId) : []), [sceneId]);

  const stepIndex = useFlowStore((s) => s.stepIndex);
  const answers = useFlowStore((s) => s.answers);
  const setStep = useFlowStore((s) => s.setStep);
  const setAnswer = useFlowStore((s) => s.setAnswer);
  const setGenerated = useFlowStore((s) => s.setGenerated);

  if (!scene || questions.length === 0) {
    return (
      <div className="py-16 text-center text-ink-500">
        <p>场景不存在</p>
        <button onClick={() => navigate('/')} className="mt-4 text-brand underline">返回首页</button>
      </div>
    );
  }

  const current = questions[stepIndex];
  const isLast = stepIndex === questions.length - 1;

  const isAnswered = (() => {
    const val = answers[current.id];
    if (!current.required) return true;
    if (current.type === 'single-choice') return typeof val === 'string' && val.length > 0;
    if (current.type === 'multi-choice') return Array.isArray(val) && val.length > 0;
    if (current.type === 'text') return typeof val === 'string' && val.length > 0;
    if (current.type === 'structured') {
      if (!val || typeof val !== 'object') return false;
      const rec = val as Record<string, string>;
      return (current.fields || [])
        .filter((f) => f.required)
        .every((f) => rec[f.key] && rec[f.key].length > 0);
    }
    return true;
  })();

  const handleNext = async () => {
    if (isLast) {
      const content = await mockGenerate(sceneId as SceneId, answers);
      setGenerated(content);
      navigate('/preview');
      return;
    }
    setStep(stepIndex + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      navigate('/');
      return;
    }
    setStep(stepIndex - 1);
  };

  return (
    <div className="space-y-6">
      {/* 顶部导航 + 进度 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <button onClick={handleBack} className="text-[13px] text-ink-500 hover:text-ink-800 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {stepIndex === 0 ? '返回' : '上一步'}
          </button>
          <span className="text-[12px] text-ink-400">
            {stepIndex + 1} / {questions.length}
          </span>
        </div>
        <ProgressBar current={stepIndex + 1} total={questions.length} />
      </div>

      {/* 场景名 */}
      <div className="text-[12px] text-ink-400 uppercase tracking-wider">
        {scene.name}
      </div>

      {/* 问题卡片 */}
      <QuestionCard
        question={current}
        value={answers[current.id]}
        onChange={(v) => setAnswer(current.id, v)}
      />

      {/* 底部按钮 */}
      <div className="pt-2">
        <button
          onClick={handleNext}
          disabled={!isAnswered}
          className="w-full h-12 rounded-md bg-ink-900 text-white text-[15px] font-medium disabled:bg-ink-200 disabled:text-ink-400 transition-colors"
        >
          {isLast ? '生成海报' : '下一步'}
        </button>
        {!current.required && !isAnswered && (
          <button
            onClick={handleNext}
            className="mt-2 w-full text-center text-[13px] text-ink-400 hover:text-ink-600 py-2"
          >
            跳过这一步
          </button>
        )}
      </div>
    </div>
  );
}
