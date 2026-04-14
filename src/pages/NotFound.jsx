import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <h1 className="text-8xl font-serif text-primary mb-4">404</h1>
      <h2 className="text-2xl font-serif text-gray-900 mb-2">Siden blev ikke fundet</h2>
      <p className="text-gray-600 mb-8">
        Den side du leder efter findes desværre ikke.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary text-white rounded hover:bg-[#6a5428] transition-colors no-underline text-sm font-semibold uppercase tracking-wider"
      >
        Tilbage til forsiden
      </Link>
    </div>
  );
}
