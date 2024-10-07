import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacios", error: true });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({ msg: "Los passwords no son iguales", error: true });

      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });

      return;
    }

    setAlerta({});
    // Crear el usuario en la api
    try {
      const url = `/veterinarios`;
      await clienteAxios.post(url, { nombre, email, password });

      setAlerta({
        msg: "Registrado Correctamente, revisa tu email",
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu Cuenta y Administra{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-7 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Nombre
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Tu Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Email de registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold  md:mt-0">
              Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold  md:mt-0">
              Repetir Password
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Confirmar Password"
              value={repetirPassword}
              onChange={(e) => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            className="bg-indigo-700  p-3 px-10 w-full rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto self-center"
            type="submit"
            value="Crear Cuenta"
          />
        </form>
        <nav className="mt-5  lg:flex lg:justify-between">
          <Link className="block text-center my-5" to="/">
            ¿Tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="block text-center my-5" to="/olvide-password">
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
