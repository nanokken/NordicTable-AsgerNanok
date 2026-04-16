import { Link } from "react-router-dom";
import { useCRUD } from "../hooks/useCRUD";

const BASE_URL = "http://localhost:3042";

const CATEGORY_LABELS = {
  starter: "Forret",
  main: "Hovedret",
  dessert: "Dessert",
};

export default function SignatureDishes() {
  const { items: dishes, loading } = useCRUD("dish", "dishes");

  const signature = dishes
    .filter((d) => d.isSignature)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  if (loading || signature.length === 0) return null;

  return (
    <section className="py-16 md:py-24 px-6 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-primary font-semibold mb-2">
          Udvalgte retter
        </p>
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
          Vores signaturretter
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-12">
          Hver af vores signaturretter er omhyggeligt sammensat af sæsonens
          bedste nordiske råvarer.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {signature.map((dish) => (
            <div key={dish._id} className="text-left">
              <div className="relative">
                <img
                  src={`${dish.image}`}
                  alt={dish.title}
                  className="w-full aspect-[4/3] object-cover rounded-lg"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 bg-primary text-white text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded">
                  Signatur
                </span>
              </div>
              <p className="text-[11px] tracking-[0.2em] uppercase text-primary font-semibold mt-4 mb-1">
                {CATEGORY_LABELS[dish.category] || dish.category}
              </p>
              <h3 className="text-xl md:text-2xl font-serif font-bold mb-2">
                {dish.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{dish.description}</p>
              <p className="text-sm font-serif font-semibold">{dish.price} kr.</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/menu"
          className="inline-block mt-14 border border-gray-900 text-gray-900 text-sm tracking-[0.15em] uppercase font-semibold px-10 py-4 rounded-full no-underline hover:bg-gray-900 hover:text-white transition-colors"
        >
          Se hele menuen
        </Link>
      </div>
    </section>
  );
}
