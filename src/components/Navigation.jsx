import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const { user, login, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex gap-4">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/menu" className="hover:text-gray-300">Menu</Link>
        <Link to="/booking" className="hover:text-gray-300">Booking</Link>
        {user && <Link to="/backoffice" className="hover:text-gray-300">Backoffice</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={logout} className="px-4 py-2 bg-red-500 rounded hover:bg-red-600">
            Logout
          </button>
        ) : (
          <button onClick={() => login({ name: "Admin" })} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600">
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
