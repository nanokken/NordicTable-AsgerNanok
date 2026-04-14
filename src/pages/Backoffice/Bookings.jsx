import { useCRUD } from "../../hooks/useCRUD";

const statusLabels = {
  new: "Ny",
  confirmed: "Bekræftet",
  cancelled: "Annulleret",
};

const statusColors = {
  new: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function Bookings() {
  const { items: bookings, loading, update, remove } = useCRUD("booking", "bookings");

  const handleStatusChange = async (booking, newStatus) => {
    await update({ _id: booking._id, status: newStatus });
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("da-DK", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("da-DK", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-serif text-center mb-10">Reservationer</h2>

      {loading ? (
        <p className="text-center text-gray-500 mt-10">Indlæser...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Ingen reservationer endnu.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-300 text-gray-500 text-left">
                <th className="py-3 px-4 font-semibold">Navn</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Dato</th>
                <th className="py-3 px-4 font-semibold">Tidspunkt</th>
                <th className="py-3 px-4 font-semibold">Gæster</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{booking.name}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.email}</td>
                  <td className="py-3 px-4">{formatDate(booking.startAt)}</td>
                  <td className="py-3 px-4">{formatTime(booking.startAt)}</td>
                  <td className="py-3 px-4">{booking.numberOfGuests}</td>
                  <td className="py-3 px-4">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-3 py-1 border-none cursor-pointer ${
                        statusColors[booking.status] || ""
                      }`}
                    >
                      <option value="new">Ny</option>
                      <option value="confirmed">Bekræftet</option>
                      <option value="cancelled">Annulleret</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => remove(booking._id)}
                      className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 flex items-center justify-center rounded cursor-pointer text-base"
                      title="Slet"
                    >
                      🗑
                    </button>
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
