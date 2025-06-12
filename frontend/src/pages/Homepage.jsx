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
                                    <div className="row row-cols-1 g-3">
                                        {recentDecks.length > 0 ? recentDecks.map((mazo, i) => (
                                            <div key={i} className="col">
                                                <div className="card p-3 shadow-sm" style={headerBgStyle}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="fw-semibold" style={cardTitleStyle}>
                                                            {mazo.nombreMazo}
                                                        </span>
                                                        <small className="text-muted">
                                                            {(mazo.fechaModificacionMazo || mazo.fechaCreacionMazo)
                                                                ? (mazo.fechaModificacionMazo || mazo.fechaCreacionMazo).split("T")[0]
                                                                : ""}
                                                        </small>
                                                    </div>
                                                    <div className="mt-2 d-flex align-items-center gap-2">
                                                        <img
                                                            src={mazo.usuario?.avatarUsuario}
                                                            alt={mazo.usuario?.nombreUsuario}
                                                            className="rounded-circle"
                                                            width="32"
                                                            height="32"
                                                            style={{ border: "1px solid var(--battleship-gray)" }}
                                                        />
                                                        <span style={cardTextStyle}>{mazo.usuario?.nombreUsuario}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <div className="text-center">No hay mazos recientes.</div>}
                                    </div>
                                </div>

                                <div className="border p-4" style={borderStyle}>
                                    <h5 className="mb-3" style={titleStyle}>
                                        Mazos más populares
                                    </h5>
                                    <div className="row row-cols-1 g-3">
                                        {popularDecks.length > 0 ? popularDecks.map((mazo, i) => (
                                            <div key={i} className="col">
                                                <div className="card p-3 shadow-sm" style={headerBgStyle}>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <span className="fw-semibold" style={cardTitleStyle}>
                                                            {mazo.nombreMazo}
                                                        </span>
                                                        <div style={{ color: "var(--dim-gray)" }}>
                                                            <i className="bi bi-heart-fill text-danger me-2"></i>
                                                            {mazo.votacionesPositivasMazo ?? 0}
                                                            <i className="bi bi-eye ms-3 me-2"></i>
                                                            {mazo.vistasMazo ?? 0}
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 d-flex align-items-center gap-2">
                                                        <img
                                                            src={mazo.usuario?.avatarUsuario}
                                                            alt={mazo.usuario?.nombreUsuario}
                                                            className="rounded-circle"
                                                            width="32"
                                                            height="32"
                                                            style={{ border: "1px solid var(--battleship-gray)" }}
                                                        />
                                                        <span style={cardTextStyle}>{mazo.usuario?.nombreUsuario}</span>
                                                    </div>
                                                </div>
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
