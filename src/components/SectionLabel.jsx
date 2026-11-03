export default function SectionLabel({ number, label, light = false }) {
  return (
    <div className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-4 sm:mb-5">
      {number && (
        <span className="relative inline-flex items-center justify-center h-6 min-w-[2.6rem] px-2 rounded-full border border-accent/40 bg-accent/10 text-accent font-semibold">
          {number}
        </span>
      )}
      <span className="h-px w-8 bg-gradient-to-r from-accent/70 to-transparent" />
      <span className={light ? 'text-text/90' : 'text-muted'}>{label}</span>
    </div>
  );
}
