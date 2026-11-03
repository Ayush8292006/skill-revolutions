export default function Marquee({
  children,
  reverse = false,
  speed = "35s",
  pauseOnHover = true,
  className = ""
}) {
  return (
    <div
      className={`flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${className}`}
    >
      <div
        className={`flex shrink-0 items-center justify-around gap-12 sm:gap-16 min-w-full ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: speed }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center justify-around gap-12 sm:gap-16 min-w-full ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
        style={{ animationDuration: speed }}
      >
        {children}
      </div>
    </div>
  );
}

