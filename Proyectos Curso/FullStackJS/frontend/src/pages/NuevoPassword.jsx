/* eslint-disable react-hooks/exhaustive-deps */
import Alerta from "../components/Alerta";

import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          msg: "Coloca tu nuevo password",
        });
        setTokenValido(true);
      } catch (error) {
        console.log(error);
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "El passwortd debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/veterinarios/olvide-password/${token}`;
      const { data } = await clienteAxios.post(url, { password });
      console.log(data);

      setAlerta({
        msg: data.msg,
      });
      setPasswordModificado(true);
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
          Restablece tu password y no pierdas Acceso a{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-7 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && !passwordModificado && (
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <label className="uppercase text-gray-600 block text-xl font-bold  md:mt-0">
                Nuevo Password
              </label>
              <input
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                type="password"
                placeholder="Ingresa tu nuevo password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              className="bg-indigo-700  p-3 px-10 w-full rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer lg:w-auto self-center"
              type="submit"
              value="Restablecer Password"
            />
          </form>
        )}

        {passwordModificado && (
          <Link className="block text-center my-5" to="/">
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NuevoPassword;
