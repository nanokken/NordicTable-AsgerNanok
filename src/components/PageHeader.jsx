import headerBg from "../assets/assets/headerbg.png";

export default function PageHeader({ subtitle, title, description }) {
  return (
    <section
      className="relative w-full h-55 md:h-65 flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 px-6 md:px-16 max-w-3xl">
        {subtitle && (
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-primary font-semibold mb-2">
            {subtitle}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl text-white font-serif font-bold leading-tight mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base text-gray-200 max-w-md">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
