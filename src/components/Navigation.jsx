import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-5 bg-white">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Nordic Table" className="h-12" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-sm font-semibold tracking-widest text-[#3d3529] uppercase hover:text-[#8a8078] no-underline transition-colors"
          >
            Forside
          </Link>
          <Link
            to="/menu"
            className="text-sm font-semibold tracking-widest text-[#3d3529] uppercase hover:text-[#8a8078] no-underline transition-colors"
          >
            Menu
          </Link>
          <Link
            to="/booking"
            className="text-sm font-semibold tracking-widest text-[#3d3529] uppercase hover:text-[#8a8078] no-underline transition-colors"
          >
            Bestil bord
          </Link>
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/backoffice"
                  className="text-sm font-semibold tracking-widest text-[#3d3529] uppercase hover:text-[#8a8078] no-underline transition-colors"
                >
                  Backoffice
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-sm font-semibold tracking-widest text-[#3d3529] uppercase underline underline-offset-4 hover:text-[#8a8078] transition-colors cursor-pointer bg-transparent border-none"
              >
                Log ud
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold tracking-widest text-[#3d3529] uppercase underline underline-offset-4 hover:text-[#8a8078] no-underline transition-colors"
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
          <span className="block w-6 h-[2px] bg-[#3d3529]"></span>
          <span className="block w-6 h-[2px] bg-[#3d3529]"></span>
          <span className="block w-6 h-[2px] bg-[#3d3529]"></span>
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
