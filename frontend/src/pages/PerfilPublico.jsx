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
        <div className="page-root" style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`,
            boxShadow: 'inset 0 0 120px 0 #000a',
        }}>
            <Header />
            <main>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-8">
                            <div className="glass-card p-5 shadow-lg mb-4" style={{
                                borderRadius: 32,
                                background: 'rgba(255,255,255,0.13)',
                                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                border: '1.5px solid rgba(255,255,255,0.18)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                color: 'var(--bone)',
                                transition: 'transform 0.18s',
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.01)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div className="d-flex align-items-center mb-4 gap-4">
                                    <img
                                        src={usuario.avatarUsuario || "/uploads/avatars/default.jpg"}
                                        alt="Avatar"
                                        className="rounded-circle shadow-lg"
                                        width="120"
                                        height="120"
                                        style={{ border: "4px solid var(--zomp)", background: "var(--bone)", boxShadow: '0 4px 24px #0007' }}
                                    />
                                    <div>
                                        <h2 style={{ color: "var(--bone)", fontWeight: 900, marginBottom: 0, letterSpacing: 1, textShadow: '0 2px 16px #000' }}>
                                            {usuario.nombreUsuario}
                                        </h2>
                                    </div>
                                </div>
                                <h4 style={{ color: "var(--zomp)", fontWeight: "bold" }}>Mazos públicos</h4>
                                {usuario.mazos && usuario.mazos.length > 0 ? (
                                    <ul className="list-group mb-4" style={{ background: 'transparent' }}>
                                        {usuario.mazos.map((mazo) => (
                                            <li
                                                key={mazo.idMazo}
                                                className="list-group-item mb-3 shadow-lg"
                                                style={{
                                                    background: 'rgba(255,255,255,0.10)',
                                                    color: 'var(--bone)',
                                                    border: '1.5px solid var(--zomp)',
                                                    borderRadius: 18,
                                                    boxShadow: '0 4px 24px #0007',
                                                    transition: 'transform 0.15s',
                                                }}
                                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.015)'}
                                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <Link to={`/mazo/${mazo.idMazo}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <i className="bi bi-bookmark-star" style={{ fontSize: 28, color: 'var(--zomp)' }}></i>
                                                        <div>
                                                            <strong style={{ color: "var(--bone)", fontWeight: 700, fontSize: 18 }}>{mazo.nombreMazo}</strong>
                                                            <span style={{ color: "var(--bole)", marginLeft: 8 }}>{mazo.descripcionMazo}</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: "var(--bole)" }}>Este usuario no tiene mazos públicos.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default PerfilPublico;
