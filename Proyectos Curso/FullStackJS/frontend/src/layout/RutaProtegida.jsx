import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
 

 
  if (cargando) {
    return (
      <div className="text-4xl w-full grid text-center items-center h-screen"><h1 className="text-indigo-700">Cargando...</h1></div>
    )
  }
 
  return (
    <>
      <Header />
      {auth?._id ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />
      )}
      <Footer />
    </>
  );
};

export default RutaProtegida;
