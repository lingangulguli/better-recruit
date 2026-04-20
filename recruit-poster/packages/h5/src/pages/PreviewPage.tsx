import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemplatesByIndustry, type Template, type ExportRatio } from '@recruit-poster/shared';
import { toPng } from 'html-to-image';
import { useFlowStore } from '../store/flowStore';
import Poster from '../components/poster/Poster';

const RATIOS: { id: ExportRatio; label: string; size: { w: number; h: number } }[] = [
  { id: '3:4',  label: '小红书 3:4', size: { w: 1080, h: 1440 } },
  { id: '1:1',  label: '朋友圈 1:1', size: { w: 1080, h: 1080 } },
  { id: 'long', label: '微信群长图',   size: { w: 1080, h: 1620 } },
];

export default function PreviewPage() {
  const navigate = useNavigate();
  const { sceneId, answers, generated, selectedTemplate, setTemplate } = useFlowStore();

  const [ratio, setRatio] = useState<ExportRatio>('3:4');
  const [exporting, setExporting] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  // 选择模板池
  const industryTag =
    sceneId === 'startup' && typeof answers.industry === 'string'
      ? answers.industry
      : undefined;
  const templates = sceneId ? getTemplatesByIndustry(sceneId, industryTag) : [];

  useEffect(() => {
    if (!selectedTemplate && templates.length > 0) {
      setTemplate(templates[0]);
    }
  }, [selectedTemplate, templates, setTemplate]);

  if (!sceneId || !generated) {
    return (
      <div className="py-16 text-center text-ink-500">
        <p>还没有生成内容</p>
        <button onClick={() => navigate('/')} className="mt-4 text-brand underline">返回首页</button>
      </div>
    );
  }

  const template = selectedTemplate || templates[0];
  const ratioConfig = RATIOS.find((r) => r.id === ratio)!;

  const handleExport = async () => {
    if (!posterRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: template.palette.bg,
      });
      const link = document.createElement('a');
      link.download = `poster-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* 顶部导航 */}
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-[13px] text-ink-500 hover:text-ink-800 flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回修改
        </button>
        <button onClick={() => navigate('/')} className="text-[13px] text-ink-400 hover:text-ink-600">
          重新开始
        </button>
      </div>

      {/* 海报预览容器 */}
      <div className="bg-white rounded-lg border border-ink-100 p-4">
        <div className="w-full overflow-auto flex justify-center">
          <div
            ref={posterRef}
            style={{
              width: ratioConfig.size.w,
              height: ratioConfig.size.h,
              transform: 'scale(0.3)',
              transformOrigin: 'top center',
              marginBottom: `-${ratioConfig.size.h * 0.7}px`,
            }}
          >
            <Poster
              template={template}
              content={generated}
              ratio={ratio}
            />
          </div>
        </div>
      </div>

      {/* 尺寸切换 */}
      <section>
        <h3 className="text-[12px] font-medium text-ink-400 uppercase tracking-wider mb-2">导出尺寸</h3>
        <div className="grid grid-cols-3 gap-2">
          {RATIOS.map((r) => (
            <button
              key={r.id}
              onClick={() => setRatio(r.id)}
              className={`h-10 text-[13px] rounded-md border transition-all ${
                ratio === r.id
                  ? 'bg-ink-900 border-ink-900 text-white'
                  : 'bg-white border-ink-200 text-ink-700 hover:border-ink-400'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </section>

      {/* 模板切换 */}
      <section>
        <h3 className="text-[12px] font-medium text-ink-400 uppercase tracking-wider mb-2">切换风格</h3>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {templates.map((t) => (
            <TemplateSwatch
              key={t.id}
              template={t}
              active={t.id === template.id}
              onClick={() => setTemplate(t)}
            />
          ))}
        </div>
      </section>

      {/* 导出按钮 */}
      <div className="pt-2">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="w-full h-12 rounded-md bg-ink-900 text-white text-[15px] font-medium disabled:bg-ink-400 transition-colors"
        >
          {exporting ? '正在导出…' : '下载海报 PNG'}
        </button>
        <p className="mt-2 text-center text-[12px] text-ink-400">
          图片默认 1080px 宽 · 2x 高清
        </p>
      </div>
    </div>
  );
}

function TemplateSwatch({
  template,
  active,
  onClick,
}: {
  template: Template;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 w-20 rounded-md border p-1.5 text-left transition-all ${
        active ? 'border-ink-900' : 'border-ink-200 hover:border-ink-400'
      }`}
    >
      <div
        className="w-full h-14 rounded-sm flex items-end p-1.5"
        style={{ background: template.palette.bg }}
      >
        <div className="w-full space-y-0.5">
          <div className="h-1 rounded-sm" style={{ background: template.palette.primary }} />
          <div className="h-0.5 rounded-sm w-3/4" style={{ background: template.palette.textMuted }} />
          <div className="h-0.5 rounded-sm w-1/2" style={{ background: template.palette.accent }} />
        </div>
      </div>
      <div className="mt-1.5 text-[11px] text-ink-600 truncate">{template.name}</div>
    </button>
  );
}
