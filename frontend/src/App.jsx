import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./components/ToastContext";
import Homepage from "./pages/Homepage";
import BuscarMazos from "./pages/BuscarMazos";
import Login from "./pages/Login";
import Mazos from "./pages/Mazos";
import Usuario from "./pages/Usuario";
import Colecciones from "./pages/Colecciones";
import PerfilPublico from "./pages/PerfilPublico";
import PaginaMazo from "./pages/PaginaMazo";
import Cartas from "./pages/Cartas";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/buscar-mazos" element={<BuscarMazos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mazos" element={<Mazos />} />
          <Route path="/colecciones" element={<Colecciones />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/usuario/:nombreUsuario" element={<PerfilPublico />} />
          <Route path="/mazo/:idMazo" element={<PaginaMazo />} />
          <Route path="/cartas" element={<Cartas />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
