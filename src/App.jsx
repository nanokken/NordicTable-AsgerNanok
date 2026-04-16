import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";

const Menu = lazy(() => import("./pages/Menu"));
const Booking = lazy(() => import("./pages/Booking"));
const Login = lazy(() => import("./components/Login"));
const Backoffice = lazy(() => import("./pages/Backoffice/Backoffice"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const location = useLocation();
  const isBackoffice = location.pathname.startsWith("/backoffice");

  return (
    <>
      <ScrollToTop />
      {!isBackoffice && <Navigation />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/backoffice" element={<Backoffice />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
