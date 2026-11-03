import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary', // 'primary', 'secondary', 'outline', 'accentOutline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  icon = 'diagonal', // 'diagonal', 'right', 'none'
  twoLine = null,
  className = '',
  disabled = false,
  type = 'button',
}) {
  const base =
    'btn-3d relative inline-flex items-center justify-between font-mono uppercase tracking-[0.14em] rounded-full overflow-hidden group select-none isolate transition-[transform,box-shadow,color,border-color] duration-300 will-change-transform';

  const sizes = {
    sm: 'pl-4 pr-1.5 py-1.5 text-[11px] gap-3',
    md: 'pl-5 pr-2 py-2 text-xs gap-4',
    lg: 'pl-6 pr-2 py-2 text-xs sm:text-[13px] gap-5',
  };
  const iconSizes = { sm: 'w-7 h-7', md: 'w-9 h-9', lg: 'w-10 h-10' };

  const variants = {
    primary:
      'bg-accent text-white font-semibold shadow-[0_10px_30px_-8px_rgba(214,42,51,0.6),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_18px_40px_-10px_rgba(214,42,51,0.8),inset_0_1px_0_rgba(255,255,255,0.3)] hover:-translate-y-0.5',
    secondary: 'bg-surfaceLight text-text border border-lineLight hover:border-accent/60 hover:-translate-y-0.5',
    outline: 'bg-white/60 text-text border border-text/20 hover:border-text/50 hover:-translate-y-0.5',
    accentOutline: 'bg-transparent text-accent border border-accent/60 hover:border-accent hover:-translate-y-0.5',
    ghost: 'bg-transparent text-muted hover:text-text !p-0',
  };

  const iconWrap = {
    primary: 'bg-white text-accent',
    secondary: 'bg-accent text-white',
    outline: 'bg-text text-bg',
    accentOutline: 'bg-accent text-white',
    ghost: 'bg-transparent text-current',
  };

  const content = (
    <>
      {/* sliding fill on hover */}
      {variant !== 'ghost' && (
        <span
          aria-hidden
          className={`absolute inset-0 -z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            variant === 'primary' ? 'bg-[#c8212a]' : 'bg-text/[0.06]'
          }`}
        />
      )}
      {twoLine ? (
        <span className="flex flex-col text-left leading-tight py-0.5">
          <span className="text-[10px] opacity-80">{twoLine[0]}</span>
          <span className="font-bold tracking-[0.14em]">{twoLine[1]}</span>
        </span>
      ) : (
        <span className="relative font-semibold py-1">{children}</span>
      )}
      {icon !== 'none' && (
        <span
          className={`relative shrink-0 ${iconSizes[size]} rounded-full flex items-center justify-center overflow-hidden ${iconWrap[variant] || iconWrap.primary}`}
        >
          <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:-translate-y-6">
            {icon === 'diagonal' ? <ArrowUpRight className="w-4 h-4 stroke-[2.2]" /> : <ArrowRight className="w-4 h-4 stroke-[2.2]" />}
          </span>
          <span className="absolute -translate-x-6 translate-y-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0">
            {icon === 'diagonal' ? <ArrowUpRight className="w-4 h-4 stroke-[2.2]" /> : <ArrowRight className="w-4 h-4 stroke-[2.2]" />}
          </span>
        </span>
      )}
      {icon === 'none' && <span className="pr-3" />}
    </>
  );

  const cls = `${base} ${sizes[size]} ${variants[variant] || variants.primary} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`;

  if (to) return <Link to={to} className={cls}>{content}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}
