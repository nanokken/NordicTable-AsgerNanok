import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logoWhite.png";

export default function BackofficeNav({ activeTab, setActiveTab }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const tabs = [
    { key: "dishes", label: "Retter" },
    { key: "bookings", label: "Reservationer" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-[#3d3529]">
      <div className="flex items-center gap-12">
          <Link to="/">
            <img src={logo} alt="Nordic Table" className="h-10" />
          </Link>
            <Link to="/" className="text-sm font-semibold tracking-widest uppercase text-gray-400 hover:text-white bg-transparent border-none cursor-pointer transition-colors px-0 py-0 rounded-none">
            Back to main site
            </Link>
      </div>

      <div className="flex items-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-sm font-semibold tracking-widest uppercase bg-transparent border-none cursor-pointer transition-colors px-0 py-0 rounded-none ${
              activeTab === tab.key
                ? "text-white underline underline-offset-4"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="text-sm font-semibold tracking-widest uppercase text-gray-400 hover:text-white bg-transparent border-none cursor-pointer transition-colors px-0 py-0 rounded-none"
        >
          Log ud
        </button>
      </div>
    </nav>
  );
}
