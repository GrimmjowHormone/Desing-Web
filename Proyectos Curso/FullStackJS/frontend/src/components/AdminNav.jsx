import { Link } from "react-router-dom";
const AdminNav = () => {
  return (
    <nav className="flex gap-3 bg-slate-400 p-4 rounded-lg mb-4 ">
      <Link
        to="/admin/perfil"
        className={`font-bold uppercase px-3 border-r border-r-yellow-50 hover:text-indigo-800 ${
          location.pathname === "/admin/perfil" ? "text-indigo-800" : "text-white"
        }`}
      >
        Perfil
      </Link>
      <Link
        to="/admin/cambiar-password"
        className={`font-bold uppercase px-3 border-r border-r-yellow-50 hover:text-indigo-800 ${
          location.pathname === "/admin/cambiar-password" ? "text-indigo-800" : "text-white"
        }`}
      >
        Cambiar Password
      </Link>
    </nav>
  );
};

export default AdminNav;
