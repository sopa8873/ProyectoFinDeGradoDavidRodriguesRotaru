import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosService from "../services/axiosService";

function Homepage() {
    const [featuredCards, setFeaturedCards] = useState([]);
    const [recentDecks, setRecentDecks] = useState([]);
    const [popularDecks, setPopularDecks] = useState([]);

    useEffect(() => {
        // Cartas: obtiene 6 aleatorias del backend
        axiosService.get("/cartas/random?cantidad=6")
            .then(cartas => {
                setFeaturedCards(Array.isArray(cartas) ? cartas : []);
            })
            .catch(() => setFeaturedCards([]));

        // Mazos: obtén todos y filtra en frontend
        axiosService.get("/mazos")
            .then(mazos => {
                mazos = Array.isArray(mazos) ? mazos : [];
                // Últimos modificados
                const recientes = [...mazos]
                    .sort((a, b) => new Date(b.fechaModificacionMazo || b.fechaCreacionMazo) - new Date(a.fechaModificacionMazo || a.fechaCreacionMazo))
                    .slice(0, 5);
                setRecentDecks(recientes);

                // Más populares
                const populares = [...mazos]
                    .sort((a, b) => (b.votacionesPositivasMazo ?? 0) - (a.votacionesPositivasMazo ?? 0))
                    .slice(0, 5);
                setPopularDecks(populares);
            })
            .catch(() => {
                setRecentDecks([]);
                setPopularDecks([]);
            });
    }, []);

    // Estilos usando variables CSS
    const borderStyle = { borderColor: "var(--battleship-gray)" };
    const titleStyle = { color: "var(--van-dyke)" };
    const cardTitleStyle = { color: "var(--dim-gray)" };
    const cardTextStyle = { color: "var(--battleship-gray)" };
    const headerBgStyle = { backgroundColor: "var(--ash-gray)", borderColor: "var(--battleship-gray)" };

    console.log("featuredCards:", featuredCards);

    return (
        <div className="page-root">
            <Header />
            <main>
                <div className="container mt-5">
                    <div className="row">
                        {/* Cartas destacadas aleatorias */}
                        <div className="col-12 col-md-7 col-lg-8">
                            <div className="border p-4 h-100" style={borderStyle}>
                                <h4 className="mb-4 text-center" style={titleStyle}>
                                    Cartas destacadas de Magic
                                </h4>
                                <div className="row row-cols-1 row-cols-md-3 g-4">
                                    {featuredCards.length > 0 ? featuredCards.map((carta, i) => (
                                        <div key={i} className="col d-flex justify-content-center">
                                            <img
                                                src={carta.imagenUrlCarta}
                                                alt={carta.nombreCarta}
                                                className="img-fluid rounded shadow-sm"
                                                style={{ maxHeight: 320, objectFit: "contain" }}
                                            />
                                        </div>
                                    )) : <div className="text-center">No hay cartas destacadas.</div>}
                                </div>
                            </div>
                        </div>

                        {/* Últimos mazos modificados y más populares */}
                        <div className="col-12 col-md-5 col-lg-4">
                            <div className="d-flex flex-column gap-3 h-100">
                                <div className="border p-4" style={borderStyle}>
                                    <h5 className="mb-3" style={titleStyle}>
                                        Últimos mazos modificados
                                    </h5>
                                    <div className="row row-cols-1 g-4">
                                        {recentDecks.length > 0 ? recentDecks.map((mazo, i) => (
                                            <div key={i} className="col">
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
                                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.025)'}
                                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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
                                                    </div>
                                                </a>
                                            </div>
                                        )) : <div className="text-center">No hay mazos recientes.</div>}
                                    </div>
                                </div>

                                <div className="border p-4" style={borderStyle}>
                                    <h5 className="mb-3" style={titleStyle}>
                                        Mazos más populares
                                    </h5>
                                    <div className="row row-cols-1 g-4">
                                        {popularDecks.length > 0 ? popularDecks.map((mazo, i) => (
                                            <div key={i} className="col">
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
                                                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.025)'}
                                                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
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
                                                    </div>
                                                </a>
                                            </div>
                                        )) : <div className="text-center">No hay mazos populares.</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Homepage;
