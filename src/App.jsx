import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Booking from "./pages/Booking";
import Backoffice from "./pages/Backoffice";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Booking />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/backoffice" element={<Backoffice />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
