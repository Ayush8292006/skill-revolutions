import { useRef } from 'react';

// Pointer-driven 3D tilt with moving glare. Wrap any card/image with it.
export default function Tilt({ children, className = '', max = 10, scale = 1.02, glare = true, as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const frame = useRef(0);

  const onMove = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * max).toFixed(2)}deg) rotateY(${((x - 0.5) * max).toFixed(2)}deg) scale3d(${scale},${scale},${scale})`;
      el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
    });
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative [transform-style:preserve-3d] transition-transform duration-300 ease-out will-change-transform ${className}`}
      {...rest}
    >
      {children}
      {glare && <span aria-hidden className="tilt-glare pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-300 z-30" />}
    </Tag>
  );
}
