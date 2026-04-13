
export default function Booking() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Booking Page</h1>
            <p className="text-lg text-gray-600 mb-8">Reserve your table with us.</p>
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">Book Now</button>
        </div>
    );
}