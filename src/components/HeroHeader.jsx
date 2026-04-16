import { Link } from "react-router-dom";
import heroBg from "../assets/assets/headerbg.webp";

export default function HeroHeader() {
  const scrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-16 max-w-2xl">
        {/* Subtitle with line */}
        <div className="flex items-center gap-4 mb-6">
          <span className="block w-10 h-[1px] bg-primary" />
          <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold m-0">
            Velkomst
          </p>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl text-white font-serif italic font-light leading-tight mb-6">
          Smag det
          <br />
          nordiske
        </h1>

        {/* Description */}
        <p className="text-sm md:text-base text-gray-300 max-w-md mb-8 leading-relaxed">
          Nordic Table er et sted, hvor sæsonens bedste råvarer forvandles til
          uforglemmelige oplevelser. Ro, kvalitet og hygge i hvert eneste
          måltid.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link
            to="/booking"
            className="px-8 py-3 bg-primary text-white text-xs font-semibold tracking-widest uppercase no-underline hover:bg-primary/80 transition-colors rounded-none"
          >
            Book bord
          </Link>
          <Link
            to="/menu"
            className="px-8 py-3 border border-white text-white text-xs font-semibold tracking-widest uppercase no-underline hover:bg-white/10 transition-colors rounded-none"
          >
            Se menuen
          </Link>
        </div>
      </div>

      {/* Scroll-down chevron */}
      <button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 bg-transparent border-none cursor-pointer p-2 animate-bounce"
        aria-label="Scroll ned"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </section>
  );
}
