export default function MenuCategory({ title, image }) {
  return (
    <div className="mt-14 first:mt-0">
      <div className="flex items-center gap-4">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-14 h-14 rounded-full object-cover"
          />
        )}
        <h2 className="text-2xl md:text-3xl font-serif font-bold">{title}</h2>
      </div>
      <hr className="border-primary/40 mt-3" />
    </div>
  );
}
