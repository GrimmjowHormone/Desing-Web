import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ msg: "El Email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );
      setAlerta({ msg: data.msg });
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
          Recupera tu Acceso y no Pierdas{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className="mt-12 md:mt-7 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mt-5">
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Email
            </label>
            <input
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="email"
              placeholder="Email registrado"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <input
            className="bg-indigo-700  p-3 px-10 w-full rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto self-center"
            type="submit"
            value="Recuperar Cuenta"
          />
        </form>
        <nav className="mt-5  lg:flex lg:justify-between">
          <Link className="block text-center my-5" to="/">
            ¿Tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="block text-center my-5" to="/registrar">
            ¿No tienes una cuenta? Regístrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default OlvidePassword;
