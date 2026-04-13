
export default function Menu() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Menu Page</h1>
            <p className="text-lg text-gray-600 mb-8">Explore our delicious offerings.</p>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">View Menu</button>
        </div>
    );
}