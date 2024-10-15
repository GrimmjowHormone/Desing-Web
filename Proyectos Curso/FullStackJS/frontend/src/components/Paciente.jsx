import usePacientes from "../hooks/usePacientes";
/* eslint-disable react/prop-types */

const Paciente = ({ paciente }) => {
  const { editarPaciente, eliminarPaciente } = usePacientes();
  const { email, fecha, nombre, propietario, sintomas } = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    nuevaFecha.setMinutes(
      nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset()
    );
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <div className="mx-5 my-10 bg-white px-5 py-10 rounded-xl shadow-md">
      <p className="font-bold uppercase my-2 text-gray-500">
        Nombre:{" "}
        <span className="font-normal normal-case text-black">{nombre}</span>
      </p>
      <p className="font-bold uppercase my-2 text-gray-500">
        Propietario:{" "}
        <span className="font-normal normal-case text-black">
          {propietario}
        </span>
      </p>
      <p className="font-bold uppercase my-2 text-gray-500">
        Email:{" "}
        <span className="font-normal normal-case text-black">{email}</span>
      </p>
      <p className="font-bold uppercase my-2 text-gray-500">
        Sintomas:{" "}
        <span className="font-normal normal-case text-black">{sintomas}</span>
      </p>
      <p className="font-bold uppercase my-2 text-gray-500">
        Fecha de alta:{" "}
        <span className="font-normal normal-case text-black">
          {formatearFecha(fecha)}
        </span>
      </p>

      <div className="flex justify-between md:justify-around mt-5">
        <button
          type="button"
          className="bg-blue-600 text-white font-bold py-3 px-10 hover:bg-blue-700 cursor-pointer uppercase rounded-lg"
          onClick={() => editarPaciente(paciente)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 text-white font-bold py-3 px-10 hover:bg-red-700 cursor-pointer uppercase rounded-lg"
          onClick={() => eliminarPaciente(paciente._id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
