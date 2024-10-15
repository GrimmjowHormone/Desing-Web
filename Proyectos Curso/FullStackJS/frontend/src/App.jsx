import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./pages/Login";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import Registrar from "./pages/Registrar";
import NuevoPassword from "./pages/NuevoPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/ PacientesProvider";
import AdministrarPacientes from "./pages/AdministrarPacientes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />

            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          <Route
            path="/admin"
            element={
              <PacientesProvider>
                <RutaProtegida />{" "}
              </PacientesProvider>
            }
          >
            <Route index element={<AdministrarPacientes />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
