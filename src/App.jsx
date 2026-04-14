import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Login from "./components/Login";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Backoffice from "./pages/Backoffice/Backoffice";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const isBackoffice = location.pathname.startsWith("/backoffice");

  return (
    <>
      <ScrollToTop />
      {!isBackoffice && <Navigation />}
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
    </>
  );
}

export default App;
