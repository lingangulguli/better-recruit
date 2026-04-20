interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: Props) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="h-1 w-full bg-ink-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-ink-900 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
