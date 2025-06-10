import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import BuscarMazos from "./pages/BuscarMazos";
import Login from "./pages/Login";
import Mazos from "./pages/Mazos";
import Usuario from "./pages/Usuario";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/buscar-mazos" element={<BuscarMazos />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mazos"
          element={
            <PrivateRoute>
              <Mazos />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <PrivateRoute>
              <Usuario />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
