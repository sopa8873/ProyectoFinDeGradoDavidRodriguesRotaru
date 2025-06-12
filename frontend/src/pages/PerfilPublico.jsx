import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import axiosService from "../services/axiosService";

function PerfilPublico() {
    const { nombreUsuario } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosService.get(`/usuarios/publico/${nombreUsuario}`)
            .then(res => {
                setUsuario(res);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error al cargar usuario:", err);
                setLoading(false);
            });
    }, [nombreUsuario]);

    if (loading) return <div style={{ color: "var(--bole)", textAlign: "center", marginTop: "2rem" }}>Cargando...</div>;
    if (!usuario) return <div style={{ color: "var(--bole)", textAlign: "center", marginTop: "2rem" }}>No se encontró el usuario.</div>;

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div
                    className="card shadow-sm p-4"
                    style={{
                        background: "var(--seasalt)",
                        border: "1px solid var(--paynes-gray)",
                        color: "var(--bole)"
                    }}
                >
                    <div className="d-flex align-items-center mb-4">
                        <img
                            src={usuario.avatarUsuario || "/uploads/avatars/default.jpg"}
                            alt="Avatar"
                            className="rounded-circle me-3"
                            width="100"
                            height="100"
                            style={{
                                border: "3px solid var(--zomp)",
                                background: "var(--bone)"
                            }}
                        />
                        <div>
                            <h2 style={{ color: "var(--paynes-gray)", fontWeight: "bold", marginBottom: 0 }}>
                                {usuario.nombreUsuario}
                            </h2>
                        </div>
                    </div>

                    <h4 style={{ color: "var(--zomp)", fontWeight: "bold" }}>Mazos públicos</h4>
                    {usuario.mazos && usuario.mazos.length > 0 ? (
                        <ul className="list-group mb-4">
                            {usuario.mazos.map((mazo) => (
                                <li
                                    key={mazo.idMazo}
                                    className="list-group-item"
                                    style={{
                                        background: "var(--bone)",
                                        color: "var(--bole)",
                                        border: "1px solid var(--zomp)",
                                        marginBottom: "0.5rem"
                                    }}
                                >
                                    <Link to={`/mazo/${mazo.idMazo}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <strong style={{ color: "var(--paynes-gray)" }}>{mazo.nombreMazo}</strong>
                                        {" – "}
                                        <span style={{ color: "var(--bole)" }}>{mazo.descripcionMazo}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p style={{ color: "var(--bole)" }}>Este usuario no tiene mazos públicos.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default PerfilPublico;
