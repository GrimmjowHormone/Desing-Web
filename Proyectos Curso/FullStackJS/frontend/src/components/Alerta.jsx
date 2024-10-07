const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "bg-red-500 "
          : "bg-indigo-600"
      } bg-gradient-to-r text-white text-center rounded-xl p-3 uppercase font-bold text-sm mb-10`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alerta;
