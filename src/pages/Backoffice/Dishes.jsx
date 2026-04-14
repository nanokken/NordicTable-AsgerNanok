import { useState, useRef } from "react";
import { useCRUD } from "../../hooks/useCRUD";

const BASE_URL = "http://localhost:3042";

const categoryLabels = {
  starter: "Forret",
  main: "Hovedret",
  dessert: "Dessert",
};

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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("isSignature", form.isSignature);
    if (file) formData.append("image", file);

    if (editingId) {
      formData.append("_id", editingId);
      await update(formData, true);
      setEditingId(null);
    } else {
      await create(formData, true);
    }

    setForm(emptyForm);
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const startEdit = (dish) => {
    setEditingId(dish._id);
    setForm({
      title: dish.title,
      description: dish.description,
      category: dish.category,
      price: dish.price,
      isSignature: dish.isSignature,
    });
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div>
      <h2 className="text-4xl font-serif text-center mb-10">Retter</h2>

      {/* Create / Edit form */}
      <h3 className="text-xl font-serif text-center mb-6 italic">
        {editingId ? "Rediger ret" : "Opret ny ret til menukortet"}
      </h3>

      <div className="flex flex-wrap items-center gap-3 mb-2 justify-center">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titel"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-36"
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Beskrivelse"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-36"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-32 bg-white"
        >
          <option value="starter">Forret</option>
          <option value="main">Hovedret</option>
          <option value="dessert">Dessert</option>
        </select>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Pris"
          className="border border-gray-300 rounded px-3 py-2 text-sm w-24"
        />
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded px-3 py-2 text-sm w-44"
        />
        <label className="flex items-center gap-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            name="isSignature"
            checked={form.isSignature}
            onChange={handleChange}
            className="w-4 h-4"
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-green-600 hover:bg-green-700 text-white w-9 h-9 flex items-center justify-center rounded text-xl font-bold cursor-pointer"
          title={editingId ? "Gem ændringer" : "Tilføj ret"}
        >
          {editingId ? "✓" : "+"}
        </button>
        {editingId && (
          <button
            onClick={cancelEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white w-9 h-9 flex items-center justify-center rounded text-xl font-bold cursor-pointer"
            title="Annuller"
          >
            ✕
          </button>
        )}
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Indlæser...</p>
      ) : (
        <div className="overflow-x-auto mt-8">
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
                <tr key={dish._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{dish.title}</td>
                  <td className="py-3 px-4 max-w-[200px] text-gray-600">{dish.description}</td>
                  <td className="py-3 px-4">{categoryLabels[dish.category] || dish.category}</td>
                  <td className="py-3 px-4">{dish.price}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`${dish.image}`}
                      alt={dish.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4">{dish.isSignature ? "True" : "False"}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => remove(dish._id)}
                        className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer text-base"
                        title="Slet"
                      >
                        🗑
                      </button>
                      <button
                        onClick={() => startEdit(dish)}
                        className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer text-base"
                        title="Rediger"
                      >
                        ✎
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
