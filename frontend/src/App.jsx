import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BuscarMazos from "./pages/BuscarMazos";
import Login from "./pages/Login";
import Mazos from "./pages/Mazos";
import Usuario from "./pages/Usuario";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/buscar-mazos" element={<BuscarMazos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mazos" element={<Mazos />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
