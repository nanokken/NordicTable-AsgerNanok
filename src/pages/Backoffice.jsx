
export default function Backoffice() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Backoffice Page</h1>
            <p className="text-lg text-gray-600 mb-8">Manage your restaurant operations efficiently.</p>
            <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">Go to Dashboard</button>
        </div>
    );
}