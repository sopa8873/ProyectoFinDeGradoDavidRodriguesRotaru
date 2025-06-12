import React from "react";
import Header from "../components/Header";

function PerfilPublico() {
    // Ejemplo de datos estáticos (simula lo que vendría de la API)
    const usuario = {
        nombre: "Juan Pérez",
        email: "juan.perez@example.com",
        avatarUrl: "/uploads/avatars/default.jpg",
        mazos: [
            { id: 1, nombre: "Mazo de fuego", descripcion: "Un mazo con cartas de fuego" },
            { id: 2, nombre: "Mazo de agua", descripcion: "Un mazo con cartas de agua" },
        ],
        colecciones: [
            { id: 1, nombre: "Colección vintage", descripcion: "Cartas antiguas y raras" },
        ],
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="card shadow-sm p-4">
                    <div className="d-flex align-items-center mb-4">
                        <img
                            src={usuario.avatarUrl}
                            alt="Avatar"
                            className="rounded-circle me-3"
                            width="100"
                            height="100"
                        />
                        <div>
                            <h2>{usuario.nombre}</h2>
                            <p className="text-muted">{usuario.email}</p>
                        </div>
                    </div>

                    <h4>Mazos públicos</h4>
                    {usuario.mazos && usuario.mazos.length > 0 ? (
                        <ul className="list-group mb-4">
                            {usuario.mazos.map((mazo) => (
                                <li key={mazo.id} className="list-group-item">
                                    <strong>{mazo.nombre}</strong> - {mazo.descripcion}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Este usuario no tiene mazos públicos.</p>
                    )}

                    <h4>Colecciones públicas</h4>
                    {usuario.colecciones && usuario.colecciones.length > 0 ? (
                        <ul className="list-group">
                            {usuario.colecciones.map((coleccion) => (
                                <li key={coleccion.id} className="list-group-item">
                                    <strong>{coleccion.nombre}</strong> - {coleccion.descripcion}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Este usuario no tiene colecciones públicas.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default PerfilPublico;
