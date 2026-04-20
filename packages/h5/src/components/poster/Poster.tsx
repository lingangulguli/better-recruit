import type { Template, GeneratedContent, ExportRatio } from '@recruit-poster/shared';

interface Props {
  template: Template;
  content: GeneratedContent;
  ratio: ExportRatio;
}

/**
 * 海报组件：固定 1080 宽，根据比例决定高度。
 * 用绝对像素值写，保证导出图像与预览一致。
 */
export default function Poster({ template, content, ratio }: Props) {
  const p = template.palette;
  const isDark = isHexDark(p.bg);

  // 尺寸由父容器控制，组件内部按 100% 填充
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: p.bg,
        color: p.text,
        fontFamily: template.fontFamily,
        padding: ratio === 'long' ? '96px 88px' : '88px 80px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* 顶部标签 */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          alignSelf: 'flex-start',
          padding: '10px 18px',
          borderRadius: 999,
          background: withAlpha(p.primary, isDark ? 0.18 : 0.1),
          color: p.primary,
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: 2,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: p.primary,
          }}
        />
        RECRUITING
      </div>

      {/* 主标题区 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: ratio === '1:1' ? 72 : 84,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          {content.headline}
        </div>
        {content.subheadline && (
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.5,
              color: p.textMuted,
              fontWeight: 400,
            }}
          >
            {content.subheadline}
          </div>
        )}
      </div>

      {/* 分割线 */}
      <div
        style={{
          width: 96,
          height: 4,
          background: p.accent,
          borderRadius: 2,
        }}
      />

      {/* 要点列表 */}
      {content.bullets.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {content.bullets.map((b, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                fontSize: 28,
                lineHeight: 1.5,
                color: p.text,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  background: p.primary,
                  borderRadius: 1,
                  marginTop: 16,
                  flexShrink: 0,
                }}
              />
              <span style={{ flex: 1 }}>{b}</span>
            </div>
          ))}
        </div>
      )}

      {/* 亮点标签 */}
      {content.tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {content.tags.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '10px 20px',
                borderRadius: 6,
                border: `1.5px solid ${withAlpha(p.textMuted, 0.3)}`,
                color: p.text,
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      )}

      {/* 底部区域：推到最底 */}
      <div style={{ flex: 1 }} />

      <div
        style={{
          borderTop: `1.5px solid ${withAlpha(p.textMuted, 0.2)}`,
          paddingTop: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 26, fontWeight: 500, color: p.text }}>
          {content.cta}
        </div>
        {content.contact && (
          <div style={{ fontSize: 24, color: p.textMuted }}>
            {content.contact}
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------- 工具 --------------------
function isHexDark(hex: string): boolean {
  const s = hex.replace('#', '');
  if (s.length < 6) return false;
  const r = parseInt(s.slice(0, 2), 16);
  const g = parseInt(s.slice(2, 4), 16);
  const b = parseInt(s.slice(4, 6), 16);
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma < 0.5;
}

function withAlpha(hex: string, alpha: number): string {
  const s = hex.replace('#', '');
  if (s.length < 6) return hex;
  const r = parseInt(s.slice(0, 2), 16);
  const g = parseInt(s.slice(2, 4), 16);
  const b = parseInt(s.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
