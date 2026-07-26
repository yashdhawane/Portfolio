export function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
      <span className="text-signal">{index}</span>
      <span className="h-px w-8 bg-hairline-solid" />
      <span>{label}</span>
    </div>
  );
}
