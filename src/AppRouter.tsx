import { Route, Routes } from "react-router-dom";
import App from "./App";
import AddProduct from "./pages/AddProduct";
import Register from "./pages/Register";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/test" element={<App />} />
      <Route path="/add" element={<AddProduct />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
