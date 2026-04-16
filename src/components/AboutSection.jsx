import restaurantImg from "../assets/assets/restaurant.webp";

const stats = [
  { value: "12", label: "Retter på menuen" },
  { value: "6", label: "Års erfaring" },
  { value: "100", label: "% Nordiske råvarer" },
];

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Content: image + text */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-stretch">
          {/* Image */}
          <div className="w-full md:w-5/12 shrink-0">
            <img
              src={restaurantImg}
              alt="Nordic Table restaurant"
              className="w-full h-full object-cover rounded-sm"
              loading="lazy"
            />
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-2">
              Om os
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-snug mb-4">
              En restaurant båret af
              <br />
              nærhed og nærvær
            </h2>

            {/* Accent line */}
            <span className="block w-14 h-[2px] bg-primary mb-6" />

            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              Nordic Table er grundlagt med en klar overbevisning: god mad
              behøver ikke at være kompliceret. Vi laver mad af det, naturen
              giver os – det nordiske køkkens uforlignelige råvarer.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Fra de friske fiskefarvande til skovens bær og urter – vores menu
              forandrer sig med årstidens rytme. Det giver gæsterne noget nyt
              at opdage, og det giver os glæden ved at lave mad med det bedste,
              vi kan få fat i.
            </p>
        <div className="mt-12 border-t border-gray-200 pt-10 flex justify-center md:justify-end gap-12 md:gap-16">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-1">
                {s.value}
              </p>
              <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-primary font-semibold m-0">
                {s.label}
              </p>
            </div>
          ))}
        </div>
          </div>
        </div>

        {/* Stats row */}
      </div>
    </section>
  );
}
