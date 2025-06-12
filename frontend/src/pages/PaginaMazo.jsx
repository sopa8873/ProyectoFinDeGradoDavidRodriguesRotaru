import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosService from "../services/axiosService";
import Header from "../components/Header";

function PaginaMazo() {
    const { idMazo } = useParams();
    const [mazo, setMazo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Supón que tienes el id del usuario logueado en localStorage
    const usuarioLogueadoId = localStorage.getItem("idUsuario");

    useEffect(() => {
        axiosService.get(`/mazos/${idMazo}`)
            .then(res => {
                console.log("Respuesta del backend:", res);
                setMazo(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar mazo:", err);
                setLoading(false);
            });
    }, [idMazo]);

    if (loading) return <div style={{ color: "var(--bole)", textAlign: "center", marginTop: "2rem" }}>Cargando...</div>;
    if (!mazo) return <div style={{ color: "var(--bole)", textAlign: "center", marginTop: "2rem" }}>No se encontró el mazo.</div>;

    // Comprueba si el usuario es dueño del mazo
    const esDueno = usuarioLogueadoId && mazo.usuario && String(mazo.usuario.idUsuario) === String(usuarioLogueadoId);
    console.log("Usuario logueado ID:", usuarioLogueadoId);
    console.log("Dueño del mazo ID:", mazo.usuario ? mazo.usuario.idUsuario : "N/A");
    console.log("Es dueño del mazo:", esDueno);
    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="card shadow-sm p-4" style={{ background: "var(--seasalt)", border: "1px solid var(--paynes-gray)", color: "var(--bole)" }}>
                    {/* Dueño del mazo */}
                    {mazo.usuario && (
                        <div className="mb-3 d-flex align-items-center">
                            <Link
                                to={`/usuario/${mazo.usuario.nombreUsuario}`}
                                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                            >
                                <img
                                    src={mazo.usuario.avatarUsuario || "/uploads/avatars/default.jpg"}
                                    alt={mazo.usuario.nombreUsuario}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        marginRight: 10,
                                        border: "2px solid var(--zomp)",
                                        background: "var(--bone)"
                                    }}
                                />
                                <span style={{ color: "var(--paynes-gray)", fontWeight: "bold" }}>
                                {mazo.usuario.nombreUsuario}
                                </span>
                            </Link>
                        </div>
                    )}

                    <h2 style={{ color: "var(--paynes-gray)", fontWeight: "bold" }}>{mazo.nombreMazo}</h2>
                    <p><strong>Descripción:</strong> {mazo.descripcionMazo}</p>
                    <p><strong>Formato:</strong> {mazo.formatoMazo}</p>
                    <p><strong>Comandante:</strong> {mazo.comandanteMazo || "N/A"}</p>
                    <p><strong>Fecha de creación:</strong> {mazo.fechaCreacionMazo && mazo.fechaCreacionMazo.split("T")[0]}</p>
                    <p><strong>Visibilidad:</strong> {mazo.visibilidadMazo ? "Público" : "Privado"}</p>
                    <p><strong>Votos positivos:</strong> {mazo.votacionesPositivasMazo}</p>

                    {esDueno && (
                        <div className="mb-3">
                            <button className="btn btn-success me-2" style={{ background: "var(--zomp)", border: "none" }}>
                                Añadir carta
                            </button>
                            <button className="btn btn-warning me-2" style={{ color: "var(--bole)", background: "var(--bone)", border: "1px solid var(--bole)" }}>
                                Quitar carta
                            </button>
                            <button className="btn btn-danger me-2" style={{ background: "var(--bole)", border: "none" }}>
                                Borrar mazo
                            </button>
                            {!mazo.visibilidadMazo && (
                                <button className="btn btn-outline-primary" style={{ borderColor: "var(--zomp)", color: "var(--zomp)" }}>
                                    Hacer público
                                </button>
                            )}
                        </div>
                    )}

                    {mazo.cartas && mazo.cartas.length > 0 && (
                        <>
                            <h4 style={{ color: "var(--zomp)", fontWeight: "bold" }}>Cartas</h4>
                            <ul className="list-group mb-4">
                                {mazo.cartas.map((carta, idx) => (
                                    <li key={idx} className="list-group-item" style={{ background: "var(--bone)", color: "var(--bole)" }}>
                                        {carta.nombreCarta}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default PaginaMazo;