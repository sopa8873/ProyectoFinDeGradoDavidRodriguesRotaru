import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "../services/axiosService";

function Colecciones() {
    const [colecciones, setColecciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchColecciones = async () => {
            try {
                const data = await axios.get("/colecciones/usuario");
                console.log("Respuesta colecciones:", data);
                setColecciones(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error al cargar las colecciones:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchColecciones();
    }, []);

    if (loading) return <p className="m-3">Cargando colecciones...</p>;

    return (
        <div className="page-root" style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`,
            boxShadow: 'inset 0 0 120px 0 #000a',
        }}>
            <Header />
            <main>
                <div className="container py-5">
                    <h2 className="mb-4 text-center" style={{ color: 'var(--bone)', fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 16px #000' }}>
                        <i className="bi bi-archive me-2" style={{ color: 'var(--zomp)' }}></i>
                        Tus Colecciones
                    </h2>
                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-lg shadow-lg" style={{ background: 'var(--zomp)', color: 'var(--seasalt)', fontWeight: 'bold', borderRadius: 18, boxShadow: '0 4px 24px #0007', letterSpacing: 1 }}>
                            <i className="bi bi-plus-circle"></i> Añadir colección
                        </button>
                    </div>
                    <div className="row g-4">
                        {colecciones.length === 0 && (
                            <div className="col-12 text-center text-light fs-4 mt-5">No tienes colecciones todavía.</div>
                        )}
                        {colecciones.map((col, idx) => (
                            <div key={idx} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                                <div className="glass-card p-4 shadow-lg w-100" style={{
                                    borderRadius: 22,
                                    background: 'rgba(255,255,255,0.13)',
                                    boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                    border: '1.5px solid rgba(255,255,255,0.18)',
                                    backdropFilter: 'blur(8px)',
                                    WebkitBackdropFilter: 'blur(8px)',
                                    color: 'var(--bone)',
                                    transition: 'transform 0.18s',
                                }}
                                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.025)'}
                                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <div className="d-flex align-items-center mb-3 gap-3">
                                        <i className="bi bi-collection-play" style={{ fontSize: 38, color: 'var(--zomp)' }}></i>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--bone)' }}>{col.nombreColeccion}</div>
                                            <div style={{ fontSize: 14, color: 'var(--zomp)' }}>{col.cartas ? col.cartas.length : 0} cartas</div>
                                        </div>
                                    </div>
                                    <div style={{ color: 'var(--bole)', fontWeight: 500, marginBottom: 8 }}>
                                        Última modificación: {col.fechaCreacionColeccion}
                                    </div>
                                    <div className="d-flex justify-content-end gap-2 mt-2">
                                        <button className="btn btn-outline-primary btn-sm px-3" style={{ borderColor: 'var(--zomp)', color: 'var(--zomp)', borderRadius: 12, fontWeight: 700 }}>
                                            <i className="bi bi-eye"></i> Ver
                                        </button>
                                        <button className="btn btn-outline-warning btn-sm px-3" style={{ borderColor: 'var(--bole)', color: 'var(--bole)', borderRadius: 12, fontWeight: 700 }}>
                                            <i className="bi bi-pencil"></i> Editar
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm px-3" style={{ borderColor: 'var(--bole)', color: 'var(--bole)', borderRadius: 12, fontWeight: 700 }}>
                                            <i className="bi bi-trash"></i> Borrar
                                        </button>
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

export default Colecciones;
