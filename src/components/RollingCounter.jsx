import { useEffect, useRef, useState } from 'react';

function SingleRollingDigit({ digit }) {
  const num = parseInt(digit, 10);
  const isNum = !isNaN(num);

  if (!isNum) {
    return <span className="inline-block text-accent/80">{digit}</span>;
  }

  return (
    <span className="inline-block h-[1em] overflow-hidden leading-[1em] align-top">
      <span
        className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: `translateY(-${num * 10}%)`,
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1em] flex items-center justify-center font-mono">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function RollingCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
  formatIndian = false
}) {
  const [displayStr, setDisplayStr] = useState("0");
  const elRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elRef.current) {
      observer.observe(elRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasAnimated) return;

    let formatted = "";
    if (typeof value === 'number') {
      if (formatIndian) {
        // e.g. 1,50,000
        formatted = value.toLocaleString('en-IN');
      } else {
        formatted = value.toLocaleString('en-US');
      }
    } else {
      formatted = String(value);
    }
    setDisplayStr(formatted);
  }, [value, hasAnimated, formatIndian]);

  const chars = displayStr.split('');

  return (
    <span ref={elRef} className={`inline-flex items-baseline font-mono tracking-tight ${className}`}>
      {prefix && <span className="mr-0.5 text-accent">{prefix}</span>}
      <span className="inline-flex items-center">
        {chars.map((char, idx) => (
          <SingleRollingDigit key={idx} digit={char} />
        ))}
      </span>
      {suffix && <span className="ml-1 text-accent font-mono text-[0.65em] font-medium">{suffix}</span>}
    </span>
  );
}

