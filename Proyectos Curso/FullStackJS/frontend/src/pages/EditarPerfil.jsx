import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit =async (e) => {
    e.preventDefault();

    const { nombre, email, telefono } = perfil;
    if ([nombre, email].includes("")) {
      setAlerta({
        msg: "Email y Nombre son obligatorios",
        error: true,
      });
      return;
    }

    if (telefono !== null && telefono.length < 10) {
      setAlerta({
        msg: "Ingrese un numero de teléfono valido",
        error: true,
      });

      return;
    }
    const resultado= await actualizarPerfil(perfil);
    setAlerta(resultado);
    setTimeout(() => {
      setAlerta({})
    }, 1800);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="text-3xl text-center mt-10 font-bold">Editar Perfil</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Información aquí</span>
      </p>

      <div className=" p-3 flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="nombre"
                className="uppercase font-bold text-gray-600"
              >
                Nombre
              </label>
              <input
                className="border bg-gray-50 w-full p-2 rounded-md mt-5"
                id="nombre"
                name="nombre"
                type="text"
                value={perfil.nombre || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="web"
                className="uppercase font-bold text-gray-600"
              >
                Sitio Web
              </label>
              <input
                className="border bg-gray-50 w-full p-2 rounded-md mt-5"
                id="web"
                name="web"
                type="text"
                value={perfil.web || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]:
                      e.target.value === "" ? null : e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="telefono"
                className="uppercase font-bold text-gray-600"
              >
                Teléfono
              </label>
              <input
                className="border bg-gray-50 w-full p-2 rounded-md mt-5"
                name="telefono"
                type="number"
                id="telefono"
                value={perfil.telefono || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]:
                      e.target.value === "" ? null : e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="email"
                className="uppercase font-bold text-gray-600"
              >
                Email
              </label>
              <input
                className="border bg-gray-50 w-full p-2  rounded-md mt-5"
                id="email"
                name="email"
                type="email"
                value={perfil.email || ""}
                onChange={(e) =>
                  setPerfil({
                    ...perfil,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <input
              type="submit"
              className="bg-blue-600 mt-5 px-10 py-3 rounded-lg w-full md:w-auto cursor-pointer text-white font-bold"
              value="Guardar Cambios"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;
