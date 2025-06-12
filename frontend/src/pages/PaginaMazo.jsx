import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosService from "../services/axiosService";
import Header from "../components/Header";
import Footer from "../components/Footer";

function PaginaMazo() {
    const { idMazo } = useParams();
    const [mazo, setMazo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nuevaCarta, setNuevaCarta] = useState("");
    const [cantidad, setCantidad] = useState(1);
    const [addError, setAddError] = useState("");
    const [addSuccess, setAddSuccess] = useState("");

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

    const handleAddCarta = async (e) => {
        e.preventDefault();
        setAddError("");
        setAddSuccess("");
        try {
            await axiosService.post(`/mazos/${idMazo}/cartas`, {
                nombreCarta: nuevaCarta,
                cantidad: cantidad,
            });
            setAddSuccess("Carta añadida correctamente");
            setNuevaCarta("");
            setCantidad(1);
            // Recarga el mazo para ver la carta añadida
            const res = await axiosService.get(`/mazos/${idMazo}`);
            setMazo(res);
        } catch (err) {
            setAddError("Error al añadir la carta");
        }
    };

    const handleDeleteCarta = async (nombreCarta) => {
        try {
            await axiosService.delete(`/mazos/${idMazo}/cartas/${encodeURIComponent(nombreCarta)}`);
            // Recarga el mazo tras borrar
            const res = await axiosService.get(`/mazos/${idMazo}`);
            setMazo(res);
        } catch (err) {
            alert("Error al borrar la carta");
        }
    };

    if (loading) return <div style={{ color: "var(--bole)", textAlign: "center", marginTop: "2rem" }}>Cargando...</div>;
    if (!mazo) return <div style={{ color: "var(--bole)", textAlign: "center", marginTop: "2rem" }}>No se encontró el mazo.</div>;

    // Comprueba si el usuario es dueño del mazo
    const esDueno = usuarioLogueadoId && mazo.usuario && String(mazo.usuario.idUsuario) === String(usuarioLogueadoId);
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
                        <div className="col-12 col-lg-10">
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
                                {/* Dueño del mazo */}
                                {mazo.usuario && (
                                    <div className="mb-3 d-flex align-items-center gap-3">
                                        <Link
                                            to={`/usuario/${mazo.usuario.nombreUsuario}`}
                                            style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                                        >
                                            <img
                                                src={mazo.usuario.avatarUsuario || "/uploads/avatars/default.jpg"}
                                                alt={mazo.usuario.nombreUsuario}
                                                style={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: "50%",
                                                    marginRight: 10,
                                                    border: "2px solid var(--zomp)",
                                                    background: "var(--bone)",
                                                    boxShadow: '0 2px 12px #0007'
                                                }}
                                            />
                                            <span style={{ color: "var(--bone)", fontWeight: "bold", fontSize: 20 }}>
                                                {mazo.usuario.nombreUsuario}
                                            </span>
                                        </Link>
                                    </div>
                                )}
                                <h2 style={{ color: "var(--bone)", fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 16px #000' }}>{mazo.nombreMazo}</h2>
                                <div className="mb-3" style={{ color: 'var(--zomp)', fontWeight: 600 }}>{mazo.descripcionMazo}</div>
                                <div className="mb-3 d-flex flex-wrap gap-3 align-items-center">
                                    <span className="badge bg-dark bg-opacity-75" style={{ fontSize: 15, fontWeight: 500 }}>{mazo.formatoMazo}</span>
                                    <span style={{ color: 'var(--bole)', fontWeight: 700 }}>
                                        <i className="bi bi-heart-fill text-danger"></i> {mazo.votacionesPositivasMazo}
                                    </span>
                                    <span style={{ color: 'var(--zomp)', fontWeight: 700 }}>
                                        <i className="bi bi-eye"></i> {mazo.vistasMazo ?? 0}
                                    </span>
                                    <span style={{ color: '#ccc', fontSize: 13, marginLeft: 8 }}>
                                        {(mazo.fechaModificacionMazo || mazo.fechaCreacionMazo)?.split('T')[0]}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <strong style={{ color: 'var(--bone)' }}>Comandante:</strong>{' '}
                                    {mazo.comandanteMazo ? (
                                        <span className="d-inline-flex align-items-center gap-2">
                                            <img
                                                src={mazo.comandanteMazo.imagenUrlCarta}
                                                alt={mazo.comandanteMazo.nombreCarta}
                                                style={{ width: 48, height: 68, objectFit: "cover", borderRadius: 8, border: "2px solid var(--zomp)", background: '#fff', boxShadow: '0 2px 12px #0007' }}
                                                className="mini-carta"
                                            />
                                            <span style={{ fontWeight: 700, color: 'var(--zomp)', fontSize: 18 }}>{mazo.comandanteMazo.nombreCarta}</span>
                                        </span>
                                    ) : (
                                        <span style={{ color: "var(--bole)", fontStyle: "italic" }}>Sin comandante</span>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <strong style={{ color: 'var(--bone)' }}>Visibilidad:</strong> {mazo.visibilidadMazo ? "Público" : "Privado"}
                                </div>
                                {esDueno && (
                                    <div className="mb-4">
                                        <form onSubmit={handleAddCarta} className="d-flex align-items-center gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Nombre de la carta"
                                                value={nuevaCarta}
                                                onChange={e => setNuevaCarta(e.target.value)}
                                                required
                                                style={{ borderRadius: 12, fontWeight: 600 }}
                                            />
                                            <input
                                                type="number"
                                                className="form-control"
                                                style={{ width: 80, borderRadius: 12 }}
                                                min={1}
                                                value={cantidad}
                                                onChange={e => setCantidad(Number(e.target.value))}
                                                required
                                            />
                                            <button className="btn btn-success px-4" type="submit" style={{ borderRadius: 12, fontWeight: 700, background: 'var(--zomp)', border: 'none' }}>
                                                Añadir carta
                                            </button>
                                        </form>
                                        {addError && <div className="alert alert-danger">{addError}</div>}
                                        {addSuccess && <div className="alert alert-success">{addSuccess}</div>}
                                        <button className="btn btn-danger me-2" style={{ background: "var(--bole)", border: "none", borderRadius: 12, fontWeight: 700 }}>
                                            Borrar mazo
                                        </button>
                                        {!mazo.visibilidadMazo && (
                                            <button className="btn btn-outline-primary" style={{ borderColor: "var(--zomp)", color: "var(--zomp)", borderRadius: 12, fontWeight: 700 }}>
                                                Hacer público
                                            </button>
                                        )}
                                    </div>
                                )}
                                <h4 style={{ color: "var(--zomp)", fontWeight: "bold" }}>Cartas</h4>
                                <ul className="list-group mb-4" style={{ background: 'transparent' }}>
                                    {mazo.cartas.map((mazoCarta, idx) => (
                                        <li key={idx} className="list-group-item d-flex align-items-center mb-2 shadow-sm" style={{ background: 'rgba(255,255,255,0.10)', color: 'var(--bone)', border: '1.5px solid var(--zomp)', borderRadius: 12, boxShadow: '0 2px 12px #0007', transition: 'transform 0.15s' }}
                                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.01)'}
                                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                        >
                                            {mazoCarta.carta ? (
                                                <div style={{ position: "relative", display: "inline-block" }}>
                                                    <img
                                                        src={mazoCarta.carta.imagenUrlCarta}
                                                        alt={mazoCarta.carta.nombreCarta}
                                                        style={{
                                                            width: 40,
                                                            height: 56,
                                                            objectFit: "cover",
                                                            marginRight: 12,
                                                            borderRadius: 6,
                                                            border: "1.5px solid var(--zomp)",
                                                            boxShadow: '0 2px 8px #0007',
                                                            transition: "box-shadow 0.2s"
                                                        }}
                                                        className="mini-carta"
                                                    />
                                                    <div className="zoom-carta">
                                                        <img
                                                            src={mazoCarta.carta.imagenUrlCarta}
                                                            alt={mazoCarta.carta.nombreCarta}
                                                            style={{
                                                                width: 200,
                                                                height: 280,
                                                                objectFit: "cover",
                                                                borderRadius: 8,
                                                                border: "2px solid var(--zomp)",
                                                                boxShadow: "0 4px 16px rgba(0,0,0,0.3)"
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span style={{ fontWeight: "bold", color: "red" }}>Carta no encontrada</span>
                                            )}
                                            <span style={{ fontWeight: "bold", color: 'var(--bone)' }}>{mazoCarta.carta?.nombreCarta}</span>
                                            <span style={{ marginLeft: "auto", color: "var(--zomp)", fontWeight: 700 }}>x{mazoCarta.cantidad}</span>
                                            <button
                                                className="btn-circular-remove"
                                                title="Eliminar carta"
                                                onClick={() => handleDeleteCarta(mazoCarta.carta?.nombreCarta)}
                                                style={{ marginLeft: 10 }}
                                            >
                                                &minus;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default PaginaMazo;