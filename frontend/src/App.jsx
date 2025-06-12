import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BuscarMazos from "./pages/BuscarMazos";
import Login from "./pages/Login";
import Mazos from "./pages/Mazos";
import Usuario from "./pages/Usuario";
import Colecciones from "./pages/Colecciones";
import PerfilPublico from "./pages/PerfilPublico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/buscar-mazos" element={<BuscarMazos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mazos" element={<Mazos />} />
        <Route path="/colecciones" element={<Colecciones />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/usuario/:nombre" element={<PerfilPublico />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
