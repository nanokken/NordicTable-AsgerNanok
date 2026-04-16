import { Link } from "react-router-dom";
import restaurantBg from "../assets/assets/restaurant2.webp";

export default function ReservationCTA() {
  return (
    <section
      className="relative w-full py-24 md:py-32 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${restaurantBg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-4">
          Reservationer
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-snug mb-6">
          Book dit bord hos
          <br />
          Nordic Table
        </h2>
        <p className="text-sm md:text-base text-gray-300 max-w-md mx-auto mb-8 leading-relaxed">
          Vi åbner vores døre for dig og dine, og giver jer en aften I aldrig
          glemmer. Book dit bord i dag – det er nemt og hurtigt.
        </p>
        <Link
          to="/booking"
          className="inline-block px-10 py-3 bg-primary text-white text-xs font-semibold tracking-widest uppercase no-underline hover:bg-primary/80 transition-colors"
        >
          Book bord nu
        </Link>
      </div>
    </section>
  );
}
