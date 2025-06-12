import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosService from "../services/axiosService";
import { Link } from "react-router-dom";

function Mazos() {
    const [mazos, setMazos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [nuevoMazo, setNuevoMazo] = useState({
        nombreMazo: "",
        descripcionMazo: "",
        formatoMazo: "",
    });

    useEffect(() => {
        const fetchMazos = async () => {
            try {
                const data = await axiosService.get("/mazos/usuario");
                setMazos(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al cargar los mazos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMazos();
    }, []);

    const handleDeleteMazo = async (idMazo) => {
        if (!window.confirm("¿Seguro que quieres borrar este mazo?")) return;
        try {
            await axiosService.delete(`/mazos/${idMazo}`);
            setMazos(mazos.filter(m => m.idMazo !== idMazo));
        } catch (err) {
            alert("Error al borrar el mazo");
        }
    };

    if (loading) return <p className="m-3" style={{ color: "var(--bole)" }}>Cargando mazos...</p>;

    return (
        <div className="page-root" style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`,
            boxShadow: 'inset 0 0 120px 0 #000a',
        }}>
            <Header />
            <main>
                <div className="container py-5">
                    <h2 className="mb-4 text-center" style={{ color: "var(--bone)", fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 16px #000' }}>
                        <i className="bi bi-collection me-2" style={{ color: 'var(--zomp)' }}></i>
                        Tus Mazos
                    </h2>
                    <div className="d-flex justify-content-center mb-4">
                        <button
                            className="btn btn-lg shadow-lg"
                            style={{ background: "var(--zomp)", color: "var(--seasalt)", fontWeight: "bold", borderRadius: 18, boxShadow: '0 4px 24px #0007', letterSpacing: 1 }}
                            onClick={() => setShowForm(!showForm)}
                        >
                            <i className="bi bi-plus-circle"></i> {showForm ? 'Cancelar' : 'Crear nuevo mazo'}
                        </button>
                    </div>
                    {showForm && (
                        <div className="row justify-content-center mb-5">
                            <div className="col-12 col-md-8 col-lg-6">
                                <div className="p-4 mb-4 shadow-lg glass-card" style={{
                                    borderRadius: 24,
                                    background: 'rgba(255,255,255,0.13)',
                                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                    border: '1.5px solid rgba(255,255,255,0.18)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                }}>
                                    <form
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            try {
                                                await axiosService.post("/mazos", nuevoMazo, {
                                                    headers: { "Content-Type": "application/json" }
                                                });
                                                setShowForm(false);
                                                setNuevoMazo({ nombreMazo: "", descripcionMazo: "", formatoMazo: "" });
                                                const data = await axiosService.get("/mazos/usuario");
                                                setMazos(Array.isArray(data) ? data : []);
                                            } catch (err) {
                                                alert("Error al crear el mazo");
                                            }
                                        }}
                                    >
                                        <input
                                            className="form-control mb-3"
                                            placeholder="Nombre del mazo"
                                            value={nuevoMazo.nombreMazo}
                                            onChange={e => setNuevoMazo({ ...nuevoMazo, nombreMazo: e.target.value })}
                                            required
                                            style={{ borderRadius: 12, fontWeight: 600 }}
                                        />
                                        <input
                                            className="form-control mb-3"
                                            placeholder="Descripción"
                                            value={nuevoMazo.descripcionMazo}
                                            onChange={e => setNuevoMazo({ ...nuevoMazo, descripcionMazo: e.target.value })}
                                            style={{ borderRadius: 12 }}
                                        />
                                        <input
                                            className="form-control mb-3"
                                            placeholder="Formato (Commander, Modern, etc)"
                                            value={nuevoMazo.formatoMazo}
                                            onChange={e => setNuevoMazo({ ...nuevoMazo, formatoMazo: e.target.value })}
                                            style={{ borderRadius: 12 }}
                                        />
                                        <div className="d-flex justify-content-end gap-2">
                                            <button className="btn btn-success px-4" type="submit" style={{ borderRadius: 12, fontWeight: 700 }}>
                                                <i className="bi bi-check-circle"></i> Crear
                                            </button>
                                            <button className="btn btn-secondary px-4" type="button" style={{ borderRadius: 12 }} onClick={() => setShowForm(false)}>
                                                Cancelar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row g-4">
                        {mazos.length === 0 && (
                            <div className="col-12 text-center text-light fs-4 mt-5">No tienes mazos todavía.</div>
                        )}
                        {mazos.map((mazo, idx) => (
                            <div key={mazo.idMazo} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                                <div
                                    className="deck-card shadow-lg w-100"
                                    style={{
                                        borderRadius: 22,
                                        minHeight: 260,
                                        background: '#181c1f',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                        transition: 'transform 0.18s',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.025)'}
                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'
                                    }
                                >
                                    <div
                                        className="deck-card-bg"
                                        style={{
                                            backgroundImage: mazo.comandanteMazo?.imagenArtCropCarta
                                                ? `url('${mazo.comandanteMazo.imagenArtCropCarta}')`
                                                : `url('/pattern.png')`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            filter: 'brightness(0.45) blur(0.5px)',
                                            position: 'absolute',
                                            inset: 0,
                                            zIndex: 1,
                                            transition: 'filter 0.2s',
                                        }}
                                    ></div>
                                    <div
                                        className="deck-card-content d-flex flex-column justify-content-between"
                                        style={{
                                            position: 'relative',
                                            zIndex: 2,
                                            padding: '1.5rem',
                                            height: '100%',
                                            color: '#fff',
                                            textShadow: '0 2px 12px #000',
                                        }}
                                    >
                                        <div className="d-flex align-items-center mb-2 gap-2">
                                            {mazo.comandanteMazo?.imagenUrlCarta && (
                                                <img
                                                    src={mazo.comandanteMazo.imagenUrlCarta}
                                                    alt={mazo.comandanteMazo.nombreCarta}
                                                    width={38}
                                                    height={54}
                                                    className="rounded shadow"
                                                    style={{ border: '2px solid var(--zomp)', background: '#fff', marginRight: 8 }}
                                                />
                                            )}
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--bone)' }}>{mazo.nombreMazo}</div>
                                                <div style={{ fontSize: 14, color: 'var(--zomp)' }}>{mazo.comandanteMazo?.nombreCarta || 'Sin comandante'}</div>
                                            </div>
                                            <span className="ms-auto badge bg-dark bg-opacity-75" style={{ fontSize: 13, fontWeight: 500 }}>
                                                {mazo.formatoMazo}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: 15, color: 'var(--seasalt)', opacity: 0.95, marginBottom: 8, fontWeight: 400 }}>
                                            {mazo.descripcionMazo}
                                        </div>
                                        <div className="d-flex align-items-center gap-2 mt-2 deck-footer">
                                            <img
                                                src={mazo.usuario?.avatarUsuario || "/uploads/avatars/default.jpg"}
                                                alt={mazo.usuario?.nombreUsuario || "Usuario"}
                                                className="rounded-circle"
                                                width="32"
                                                height="32"
                                                style={{ border: "1.5px solid var(--zomp)" }}
                                            />
                                            <span style={{ color: 'var(--bone)', fontWeight: 500 }}>
                                                {mazo.usuario?.nombreUsuario || "Usuario"}
                                            </span>
                                            <span className="ms-auto" style={{ color: 'var(--zomp)' }}>
                                                <i className="bi bi-eye"></i> {mazo.vistasMazo ?? 0}
                                            </span>
                                            <span style={{ color: 'var(--bole)' }}>
                                                <i className="bi bi-heart-fill text-danger"></i> {mazo.votacionesPositivasMazo ?? 0}
                                            </span>
                                            <span style={{ color: '#ccc', fontSize: 13, marginLeft: 8 }}>
                                                {(mazo.fechaModificacionMazo || mazo.fechaCreacionMazo)?.split('T')[0]}
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-end gap-2 mt-3">
                                            <Link
                                                to={`/mazo/${mazo.idMazo}`}
                                                className="btn btn-outline-primary btn-sm px-3"
                                                style={{ borderColor: "var(--zomp)", color: "var(--zomp)", borderRadius: 12, fontWeight: 700 }}
                                            >
                                                <i className="bi bi-eye"></i> Ver
                                            </Link>
                                            <button
                                                className="btn btn-outline-danger btn-sm px-3"
                                                style={{ borderColor: "var(--bole)", color: "var(--bole)", borderRadius: 12, fontWeight: 700 }}
                                                onClick={() => handleDeleteMazo(mazo.idMazo)}
                                            >
                                                <i className="bi bi-trash"></i> Borrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Mazos;
