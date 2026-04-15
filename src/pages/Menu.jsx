import { useCRUD } from "../hooks/useCRUD";
import PageHeader from "../components/PageHeader";
import MenuCategory from "../components/menu/MenuCategory";
import MenuItem from "../components/menu/MenuItem";
import Footer from "../components/Footer";

const categories = [
  { key: "starter", label: "Forretter" },
  { key: "main", label: "Hovedretter" },
  { key: "dessert", label: "Desserter" },
];

export default function Menu() {
  const { items: dishes, loading } = useCRUD("dish", "dishes");

  return (
    <div>
      <PageHeader
        subtitle="Vores Menu"
        title="Smagsoplevelser fra det nordiske køkken"
        description="Alt på vores menu er tilberedt af sæsonens friskeste råvarer. Vi arbejder tæt med lokale producenter for at sikre den bedste kvalitet."
      />

      <section className="max-w-3xl mx-auto px-6 md:px-16 py-12 md:py-20">
        {loading ? (
          <p className="text-center text-gray-500">Indlæser menu…</p>
        ) : (
          categories.map(({ key, label }) => {
            const items = dishes.filter((d) => d.category === key);
            if (items.length === 0) return null;

            return (
              <div key={key}>
                <MenuCategory title={label} image={items[0]?.image} />
                {items.map((dish) => (
                  <MenuItem
                    key={dish._id}
                    title={dish.title}
                    description={dish.description}
                    price={dish.price}
                  />
                ))}
              </div>
            );
          })
        )}
      </section>

      <Footer />
    </div>
  );
}