import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth, token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin");
    }
  }, [token,navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (email.length < 6) {
      setAlerta({ msg: "Ingrese un Email Valido", error: true });
      return;
    }
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser mayor a 6 caracteres",
        error: true,
      });

      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post(`/veterinarios/login`, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      navigate("/admin");
      setAlerta({ msg: "Usuario Autenticado", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };

  const { msg } = alerta;

  if (token) {
    return null;
  }
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Inicia Sesión y Administra{" "}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>
      <div className="mt-12 md:mt-7 shadow-lg p-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold ">
              Email
            </label>
            <input
            id="email"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="text"
              placeholder="Email de registro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold  md:mt-0">
              Password
            </label>
            <input
              id="password"
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
              type="password"
              placeholder="Introduce tu Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            className="bg-indigo-700  p-3 px-10 w-full rounded-xl text-white uppercase font-bold mt-5 hover:bg-indigo-900 hover:cursor-pointer md:w-auto self-center"
            type="submit"
            value="Iniciar Sesion"
          />
        </form>
        <nav className="mt-5  lg:flex lg:justify-between">
          <Link className="block text-center my-5" to="/registrar">
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link className="block text-center my-5" to="/olvide-password">
            Olvide mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
