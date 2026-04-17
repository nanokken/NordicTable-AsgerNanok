import { useState, useRef } from "react";
import { useCRUD } from "../../hooks/useCRUD";

const BASE_URL = import.meta.env.VITE_API_URL;

const categoryLabels = {
  starter: "Forret",
  main: "Hovedret",
  dessert: "Dessert",
};

function EditRow({ dish, onSave, onCancel }) {
  const [form, setForm] = useState({
    title: dish.title,
    description: dish.description,
    category: dish.category,
    price: dish.price,
    isSignature: dish.isSignature,
  });
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("isSignature", form.isSignature);
    formData.append("id", dish._id);
    if (file) formData.append("image", file);
    onSave(formData);
  };

  return (
    <tr>
      <td colSpan={7} className="p-0">
        <div className="bg-primary/5 border-y border-primary/20 px-6 py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Titel *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Pris *
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Beskrivelse *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={2}
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                >
                  <option value="starter">Forret</option>
                  <option value="main">Hovedret</option>
                  <option value="dessert">Dessert</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Billede
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-sm file:mr-3 file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:rounded file:text-xs file:font-semibold"
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    name="isSignature"
                    checked={form.isSignature}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                    Signaturret
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-1">
              <button
                type="submit"
                className="flex-1 bg-primary text-white font-semibold uppercase tracking-wider text-sm py-2.5 rounded hover:bg-[#6a5428] transition-colors cursor-pointer"
              >
                Gem ændringer
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-6 bg-gray-200 text-gray-700 font-semibold uppercase tracking-wider text-sm py-2.5 rounded hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Annuller
              </button>
            </div>
          </form>
        </div>
      </td>
    </tr>
  );
}

export default function Dishes() {
  const { items: dishes, loading, create, update, remove } = useCRUD("dish", "dishes");

  const emptyForm = { title: "", description: "", category: "main", price: "", isSignature: false };
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("isSignature", form.isSignature);
    if (file) formData.append("image", file);

    await create(formData, true);
    setForm(emptyForm);
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleEditSave = async (formData) => {
    await update(formData, true);
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-4xl font-serif text-center mb-10">Retter</h2>

      {/* Create form */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
        <h3 className="text-xl font-serif text-center mb-6">
          Opret ny ret til menukortet
        </h3>

        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Titel *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Nordisk torsk"
                required
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Pris *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="245"
                required
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Beskrivelse *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Smørstegt torsk med nye kartofler, grønne urter og let citronsauce"
              required
              rows={2}
              className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Kategori *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
              >
                <option value="starter">Forret</option>
                <option value="main">Hovedret</option>
                <option value="dessert">Dessert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                Billede
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileRef}
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm file:mr-3 file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:rounded file:text-xs file:font-semibold"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  name="isSignature"
                  checked={form.isSignature}
                  onChange={handleChange}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Signaturret
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold uppercase tracking-wider text-sm py-3 rounded hover:bg-[#6a5428] transition-colors cursor-pointer mt-2"
          >
            Tilføj ret
          </button>
        </form>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Indlæser...</p>
      ) : dishes.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Ingen retter endnu.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-gray-500 text-left">
                <th className="py-3 px-4 font-semibold">Titel</th>
                <th className="py-3 px-4 font-semibold">Beskrivelse</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Pris</th>
                <th className="py-3 px-4 font-semibold">Billede</th>
                <th className="py-3 px-4 font-semibold">Signaturret</th>
                <th className="py-3 px-4 font-semibold">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map((dish) => (
                <>
                  <tr
                    key={dish._id}
                    className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                      editingId === dish._id ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium">{dish.title}</td>
                    <td className="py-3 px-4 max-w-[200px] text-gray-600 text-xs leading-relaxed">
                      {dish.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                        {categoryLabels[dish.category] || dish.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium">{dish.price} kr</td>
                    <td className="py-3 px-4">
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          dish.isSignature
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {dish.isSignature ? "Ja" : "Nej"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setEditingId(editingId === dish._id ? null : dish._id)
                          }
                          className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer text-sm transition-colors ${
                            editingId === dish._id
                              ? "bg-gray-300 hover:bg-gray-400 text-gray-700"
                              : "bg-primary hover:bg-[#6a5428] text-white"
                          }`}
                          title={editingId === dish._id ? "Luk" : "Rediger"}
                        >
                          {editingId === dish._id ? "▲" : "✎"}
                        </button>
                        <button
                          onClick={() => remove(dish._id)}
                          className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer text-sm transition-colors"
                          title="Slet"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                  {editingId === dish._id && (
                    <EditRow
                      key={`edit-${dish._id}`}
                      dish={dish}
                      onSave={handleEditSave}
                      onCancel={() => setEditingId(null)}
                    />
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
