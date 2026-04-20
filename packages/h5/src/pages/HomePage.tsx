import { useNavigate } from 'react-router-dom';
import { SCENES } from '@recruit-poster/shared';
import { useFlowStore } from '../store/flowStore';

export default function HomePage() {
  const navigate = useNavigate();
  const setScene = useFlowStore((s) => s.setScene);

  const handlePick = (sceneId: string) => {
    setScene(sceneId as any);
    navigate(`/flow/${sceneId}`);
  };

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="pt-6 pb-4">
        <h1 className="text-[28px] leading-[1.25] font-semibold text-ink-900 tracking-tight">
          点击式生成招募海报
        </h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-ink-500">
          不用写文案，不用会设计。几次点击，30 秒产出专业海报。
        </p>
      </section>

      {/* 场景选择 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[13px] font-medium text-ink-400 uppercase tracking-wider">
            选择场景
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SCENES.map((scene) => (
            <button
              key={scene.id}
              onClick={() => handlePick(scene.id)}
              className="group text-left bg-white rounded-lg border border-ink-100 hover:border-ink-300 hover:shadow-card p-5 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[16px] font-medium text-ink-900">{scene.name}</div>
                  <div className="mt-0.5 text-[13px] text-ink-400">{scene.subtitle}</div>
                </div>
                <div className="text-ink-300 group-hover:text-ink-600 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-[1.5] text-ink-500">
                {scene.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 产品原则 */}
      <section className="pt-4">
        <h2 className="text-[13px] font-medium text-ink-400 uppercase tracking-wider mb-3">
          设计原则
        </h2>
        <div className="bg-white rounded-lg border border-ink-100 divide-y divide-ink-100">
          {[
            ['点击代替写作', '选择比输入更轻'],
            ['AI 只填空润色', '不编造，不夸张，不假大空'],
            ['模板可编辑', '生成后仍保持版式美观'],
          ].map(([title, desc]) => (
            <div key={title} className="px-5 py-3.5">
              <div className="text-[14px] font-medium text-ink-800">{title}</div>
              <div className="mt-0.5 text-[13px] text-ink-500">{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
