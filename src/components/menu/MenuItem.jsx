export default function MenuItem({ title, description, price }) {
  return (
    <div className="border-b border-gray-200 py-5">
      <div className="flex justify-between items-baseline">
        <h3 className="text-xl md:text-2xl font-serif font-bold">{title}</h3>
        <span className="text-sm text-gray-600 whitespace-nowrap">{price} kr.</span>
      </div>
      <p className="text-sm text-gray-500 mt-1 mb-0">{description}</p>
    </div>
  );
}
