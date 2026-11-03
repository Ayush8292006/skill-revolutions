import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Section headings & marked cards rise in with a 3D hinge as they enter.
// CSS transitions are paused while GSAP drives the transform (otherwise the
// two fight every frame and the element flickers), and the inline styles are
// cleared afterwards so hover / tilt effects work normally again.
export function useReveal3D(scopeRef, selector = 'h2, [data-reveal]') {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray(selector).filter((el) => !el.closest('[data-no-reveal]'));
      els.forEach((el) => {
        const prevTransition = el.style.transition;
        gsap.fromTo(
          el,
          mobile
            ? { autoAlpha: 0, y: 40 }
            : { autoAlpha: 0, y: 60, rotateX: -28, transformPerspective: 1100, transformOrigin: '50% 100%' },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: mobile ? 0.8 : 1.05,
            ease: 'power3.out',
            force3D: true,
            immediateRender: true,
            onStart: () => {
              el.style.transition = 'none';
            },
            onComplete: () => {
              gsap.set(el, { clearProps: 'transform,opacity,visibility' });
              el.style.transition = prevTransition;
            },
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }
        );
      });
    }, scopeRef);
    // images that load later change page height — keep trigger positions right
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 1200);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
      ctx.revert();
    };
  }, [scopeRef, selector]);
}
