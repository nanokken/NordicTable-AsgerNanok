import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(email, password);
    if (result.success) {
      navigate("/backoffice");
    } else {
      setError("Forkert e-mail eller adgangskode");
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      <div className="max-w-[540px] mx-auto px-6 pt-12 pb-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#6b6155] hover:text-[#3d3529] mb-10 no-underline"
        >
          <span className="text-lg">←</span>
          Tilbage til forsiden
        </Link>

        <h1 className="font-serif text-5xl font-normal text-[#3d3529] mb-3">
          Log ind
        </h1>
        <p className="text-[#6b6155] text-base mb-12">
          Adgang forbeholdt personale og administratorer
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest text-[#8a8078] uppercase">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Jens Jensen"
              required
              className="w-full px-4 py-3 border border-[#d4c9b8] bg-white text-[#3d3529] rounded-none text-base outline-none focus:border-[#3d3529] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-widest text-[#8a8078] uppercase">
              Adgangskode
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
              className="w-full px-4 py-3 border border-[#d4c9b8] bg-white text-[#3d3529] rounded-none text-base outline-none focus:border-[#3d3529] transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#1a1a1a] text-white text-sm font-semibold tracking-widest uppercase hover:bg-black transition-colors cursor-pointer"
          >
            Log ind
          </button>
        </form>
      </div>
    </div>
  );
}
