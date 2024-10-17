import AdminNav from "../components/AdminNav";
import { useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";
const CambiarPassword = () => {
  const { guardarPassword } = useAuth();
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: "El password debe tener al menos 6 caracteres",
        error: true,
      });
    }
    const respuesta= await guardarPassword(password);
    setAlerta(respuesta);
    setTimeout(() => {
      setAlerta({})
    }, 1800);
  };

  const { msg } = alerta;
  return (
    <>
      <AdminNav />
      <h2 className="text-3xl text-center mt-10 font-bold">
        Cambiar Password{" "}
      </h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Modifica tu {""}{" "}
        <span className="text-indigo-600 font-bold">Contraseña aquí</span>
      </p>
      <div className=" p-3 flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg && <Alerta alerta={alerta} />}
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <label
                htmlFor="pwd_actual"
                className="uppercase font-bold text-gray-600"
              >
                Password Actual
              </label>
              <input
                className="border bg-gray-50 mb-2 w-full p-2 rounded-md mt-5"
                id="pwd_actual"
                name="pwd_actual"
                type="password"
                placeholder="Ingresa tu password actual"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="pwd_nuevo"
                className="uppercase  font-bold text-gray-600"
              >
                Password Nuevo
              </label>
              <input
                className="border bg-gray-50 w-full p-2 rounded-md mt-5"
                id="pwd_nuevo"
                name="pwd_nuevo"
                type="password"
                placeholder="Ingresa tu nuevo password"
                onChange={(e) =>
                  setPassword({
                    ...password,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>

            <input
              type="submit"
              className="bg-blue-600 mt-5 px-10 py-3 rounded-lg w-full md:w-auto cursor-pointer text-white font-bold"
              value="Cambiar Password"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default CambiarPassword;
