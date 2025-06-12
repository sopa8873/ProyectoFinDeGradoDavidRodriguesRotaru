import React, { useEffect, useState, memo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosService from "../services/axiosService";

function Homepage() {
    const [featuredCards, setFeaturedCards] = useState([]);
    const [recentDecks, setRecentDecks] = useState([]);
    const [modalCarta, setModalCarta] = useState(null);
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        axiosService.get("/cartas/random?cantidad=6")
            .then(cartas => {
                setFeaturedCards(Array.isArray(cartas) ? cartas : []);
            })            .catch(() => setFeaturedCards([]));

        axiosService.get("/mazos")            .then(mazos => {
                mazos = Array.isArray(mazos) ? mazos : [];
                const recientes = [...mazos]
                    .sort((a, b) => new Date(b.fechaModificacionMazo || b.fechaCreacionMazo) - new Date(a.fechaModificacionMazo || a.fechaCreacionMazo))
                    .slice(0, 5);
                setRecentDecks(recientes);
            })
            .catch(() => {
                setRecentDecks([]);
            });

        const handleScroll = () => {
            setShowScroll(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);    const borderStyle = { borderColor: "var(--battleship-gray)" };
    const titleStyle = { color: "var(--van-dyke)" };
    const cardTitleStyle = { color: "var(--dim-gray)" };
    const cardTextStyle = { color: "var(--battleship-gray)" };
    const headerBgStyle = { backgroundColor: "var(--ash-gray)", borderColor: "var(--battleship-gray)" };    console.log("featuredCards:", featuredCards);

    const RecentDeckCard = memo(({ mazo }) => (
        <div className="col">
            <a
                href={`/mazo/${mazo.idMazo}`}
                className="deck-card h-100 text-decoration-none shadow-lg"
                style={{
                    position: 'relative',
                    minHeight: 180,
                    borderRadius: 18,
                    overflow: 'hidden',
                    boxShadow: '0 6px 32px rgba(0,0,0,0.25)',
                    display: 'block',
                    color: 'inherit',
                    background: '#181c1f',
                    transition: 'transform 0.15s',
                }}
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
                    className="deck-card-content"
                    style={{
                        position: 'relative',
                        zIndex: 2,
                        padding: '1.5rem',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
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
                                loading="lazy"
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
                            loading="lazy"
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
                </div>
            </a>
        </div>
    ));

    const handleOpenModal = (carta) => setModalCarta(carta);
    const handleCloseModal = () => setModalCarta(null);

    return (
        <div className="page-root" style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`,
            boxShadow: 'inset 0 0 120px 0 #000a',
        }}>
            <Header />
            <main>
                <div className="container mt-5">
                    <div className="row g-4">
                        {/* Cartas destacadas aleatorias */}
                        <div className="col-12 col-md-7 col-lg-8">
                            <div className="p-4 h-100 shadow-lg glass-card" style={{
                                borderRadius: 24,
                                background: 'rgba(255,255,255,0.10)',
                                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                border: '1.5px solid rgba(255,255,255,0.18)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                color: 'var(--bone)',
                                minHeight: 420,
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <h4 className="mb-4 text-center" style={{ color: 'var(--bone)', fontWeight: 900, letterSpacing: 1 }}>
                                    <i className="bi bi-stars me-2" style={{ color: 'var(--zomp)' }}></i>
                                    Cartas destacadas de Magic
                                </h4>
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    {featuredCards.length > 0 ? featuredCards.map((carta, i) => (
                                        <div key={i} className="col d-flex justify-content-center">
                                            <div
                                                className="card border-0 shadow-lg carta-glass carta-hover"
                                                style={{
                                                    borderRadius: 18,
                                                    background: 'rgba(255,255,255,0.13)',
                                                    boxShadow: '0 4px 24px 0 rgba(31,38,135,0.25)',
                                                    backdropFilter: 'blur(4px)',
                                                    WebkitBackdropFilter: 'blur(4px)',
                                                    transition: 'transform 0.18s',
                                                    overflow: 'hidden',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleOpenModal(carta)}
                                                title="Ver carta ampliada"
                                            >
                                                <img
                                                    src={carta.imagenUrlCarta}
                                                    alt={carta.nombreCarta}
                                                    className="img-fluid rounded"
                                                    style={{ maxHeight: 320, objectFit: "contain", borderRadius: 18, border: '2px solid var(--zomp)', boxShadow: '0 2px 12px #0007' }}
                                                    loading="lazy"
                                                />
                                                <div className="p-2 text-center" style={{ color: 'var(--bone)', fontWeight: 600, fontSize: 15, textShadow: '0 1px 8px #000' }}>
                                                    {carta.nombreCarta}
                                                </div>
                                            </div>
                                        </div>
                                    )) : <div className="text-center">No hay cartas destacadas.</div>}
                                </div>
                            </div>
                        </div>
                        {/* Últimos mazos modificados */}
                        <div className="col-12 col-md-5 col-lg-4 d-flex flex-column">
                            {/* Últimos mazos modificados */}
                            <div className="p-4 shadow-lg glass-card" style={{
                                borderRadius: 24,
                                background: 'rgba(255,255,255,0.10)',
                                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)',
                                border: '1.5px solid rgba(255,255,255,0.18)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                color: 'var(--bone)',
                                minHeight: 320,
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                <h5 className="mb-3" style={{ color: 'var(--bone)', fontWeight: 800, letterSpacing: 1 }}>
                                    <i className="bi bi-clock-history me-2" style={{ color: 'var(--zomp)' }}></i>
                                    Últimos mazos modificados
                                </h5>
                                <div className="row row-cols-1 g-4">
                                    {recentDecks.length > 0 ? recentDecks.map((mazo, i) => (
                                        <RecentDeckCard key={i} mazo={mazo} />
                                    )) : <div className="text-center">No hay mazos recientes.</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Modal de carta ampliada */}
            {modalCarta && (
                <div className="modal-carta-backdrop" onClick={handleCloseModal}>
                    <div className="modal-carta" onClick={e => e.stopPropagation()}>
                        <img src={modalCarta.imagenUrlCarta} alt={modalCarta.nombreCarta} className="img-fluid rounded" style={{ maxHeight: 480, borderRadius: 18, border: '3px solid var(--zomp)', boxShadow: '0 6px 32px #000b' }} />
                        <div className="mt-3 text-center" style={{ color: 'var(--bone)', fontWeight: 700, fontSize: 22, textShadow: '0 2px 12px #000' }}>{modalCarta.nombreCarta}</div>
                        <button className="btn btn-outline-light mt-3" style={{ borderRadius: 12, fontWeight: 700 }} onClick={handleCloseModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Homepage;
