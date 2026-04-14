import { useState } from "react";
import { useCRUD } from "../hooks/useCRUD";

const infoCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Bordstørrelse",
    text: "Vi tager imod selskaber fra 1 til 12 personer. Kontakt os direkte for større selskaber.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Åbningstider",
    text: "Tirsdag-torsdag kl. 17-22. Fredag-lørdag kl. 17-23. Søndag kl. 12-20. Mandag lukket.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Kontakt",
    text: "Ring på +45 12 34 56 78 eller skriv til info@nordictable.dk ved spørgsmål.",
  },
];

export default function BookingSection() {
  const { create } = useCRUD("booking", "bookings");

  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    numberOfGuests: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const startAt = new Date(`${form.date}T${form.time}`);

    const result = await create({
      name: form.name,
      email: form.email,
      startAt,
      numberOfGuests: Number(form.numberOfGuests),
    });

    if (result.success) {
      setMessage({ type: "success", text: "Din reservation er modtaget!" });
      setForm({ name: "", email: "", date: "", time: "", numberOfGuests: "" });
    } else {
      setMessage({ type: "error", text: "Noget gik galt. Prøv igen." });
    }

    setSubmitting(false);
  };

  return (
    <section className="bg-background py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left – Info */}
        <div className="flex-1">
          <p className="text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-2">
            Gæstfrihed
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Velkomst fra højre ben
          </h2>
          <p className="text-sm text-gray-600 mb-8 max-w-md">
            Vi ønsker at give dig og dine gæster den bedst mulige oplevelse. Her
            er hvad du skal vide inden dit besøg.
          </p>

          <div className="flex flex-col gap-4">
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="flex items-start gap-4 bg-[#3d3529] text-white rounded-lg p-5"
              >
                <span className="text-primary mt-0.5">{card.icon}</span>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1 text-white">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {card.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Form */}
        <div className="flex-1 lg:max-w-md">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="font-serif text-2xl text-gray-900 mb-6">
              Din reservation
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Fulde navn *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jens Jensen"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jens@example.dk"
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Dato *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Tidspunkt *
                  </label>
                  <select
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                  >
                    <option value="">Vælg tidspunkt</option>
                    <option value="17:00">17:00</option>
                    <option value="17:30">17:30</option>
                    <option value="18:00">18:00</option>
                    <option value="18:30">18:30</option>
                    <option value="19:00">19:00</option>
                    <option value="19:30">19:30</option>
                    <option value="20:00">20:00</option>
                    <option value="20:30">20:30</option>
                    <option value="21:00">21:00</option>
                    <option value="21:30">21:30</option>
                    <option value="22:00">22:00</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Antal gæster *
                </label>
                <select
                  name="numberOfGuests"
                  value={form.numberOfGuests}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                >
                  <option value="">Vælg antal gæster</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              {message && (
                <p
                  className={`text-sm ${
                    message.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {message.text}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-white font-semibold uppercase tracking-wider text-sm py-3 rounded hover:bg-[#6a5428] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {submitting ? "Booker..." : "Book bord"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
