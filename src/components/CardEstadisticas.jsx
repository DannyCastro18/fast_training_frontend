"use client";

const CardEstadisticas = ({ jugador, estadistca }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{jugador.nombre}</h5>
        <p className="card-text">
          <strong>{estadistica}</strong>: {jugador[estadistica]}
        </p>
      </div>
    </div>
  );
};

export default CardEstadisticas;
