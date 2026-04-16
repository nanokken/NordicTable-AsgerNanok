import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.webp";
import logoWhite from "../assets/logoWhite.webp";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const transparent = isHome && !scrolled;

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-colors duration-300 ${transparent ? "bg-transparent" : "bg-white shadow-sm"}`}>
        {/* Logo */}
        <Link to="/">
          <img src={transparent ? logoWhite : logo} alt="Nordic Table" className="h-12" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className={`text-sm font-semibold tracking-widest uppercase no-underline transition-colors ${transparent ? "text-white hover:text-gray-300" : "text-[#3d3529] hover:text-[#8a8078]"}`}
          >
            Forside
          </Link>
          <Link
            to="/menu"
            className={`text-sm font-semibold tracking-widest uppercase no-underline transition-colors ${transparent ? "text-white hover:text-gray-300" : "text-[#3d3529] hover:text-[#8a8078]"}`}
          >
            Menukort
          </Link>
          <Link
            to="/booking"
            className={`text-sm font-semibold tracking-widest uppercase no-underline transition-colors ${transparent ? "text-white hover:text-gray-300" : "text-[#3d3529] hover:text-[#8a8078]"}`}
          >
            Bestil bord
          </Link>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/backoffice"
                  className={`text-sm font-semibold tracking-widest uppercase no-underline transition-colors ${transparent ? "text-white hover:text-gray-300" : "text-[#3d3529] hover:text-[#8a8078]"}`}
                >
                  Backoffice
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`text-sm font-semibold tracking-widest uppercase underline underline-offset-4 transition-colors cursor-pointer bg-transparent border-none ${transparent ? "text-white hover:text-gray-300" : "text-[#3d3529] hover:text-[#8a8078]"}`}
              >
                Log ud
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`text-sm font-semibold tracking-widest uppercase underline underline-offset-4 transition-colors ${transparent ? "text-white hover:text-gray-300" : "text-[#3d3529] hover:text-[#8a8078]"}`}
            >
              Log ind
            </Link>
          )}
        </div>

        {/* Burger button (mobile) */}
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Åbn menu"
        >
          <span className={`block w-6 h-[2px] ${transparent ? "bg-primary" : "bg-[#3d3529]"}`}></span>
          <span className={`block w-6 h-[2px] ${transparent ? "bg-primary" : "bg-[#3d3529]"}`}></span>
          <span className={`block w-6 h-[2px] ${transparent ? "bg-primary" : "bg-[#3d3529]"}`}></span>
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex items-center justify-between px-8 py-5">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src={logo} alt="Nordic Table" className="h-12" />
            </Link>
            <button
              className="text-3xl text-[#3d3529] bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen(false)}
              aria-label="Luk menu"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-2xl text-[#3d3529] no-underline hover:text-[#8a8078] transition-colors"
            >
              Forside
            </Link>
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-2xl text-[#3d3529] no-underline hover:text-[#8a8078] transition-colors"
            >
              Menu
            </Link>
            <Link
              to="/booking"
              onClick={() => setMenuOpen(false)}
              className="font-serif text-2xl text-[#3d3529] no-underline hover:text-[#8a8078] transition-colors"
            >
              Book bord
            </Link>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/backoffice"
                    onClick={() => setMenuOpen(false)}
                    className="font-serif text-2xl text-[#3d3529] no-underline hover:text-[#8a8078] transition-colors"
                  >
                    Backoffice
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="font-serif text-2xl text-[#3d3529] bg-transparent border-none cursor-pointer hover:text-[#8a8078] transition-colors"
                >
                  Log ud
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl text-[#3d3529] no-underline hover:text-[#8a8078] transition-colors"
              >
                Log ind
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
