import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import axiosService from "../services/axiosService";

function BuscarMazos() {
    // Estados para inputs
    const [nombreMazo, setNombreMazo] = useState("");
    // Estado para resultados filtrados
    const [resultados, setResultados] = useState([]);
    const [mazosData, setMazosData] = useState([]); // <-- Nuevo estado

    // Cargar todos los mazos al montar
    useEffect(() => {
        const fetchMazos = async () => {
            try {
                const data = await axiosService.get("/mazos");
                setMazosData(data);
                setResultados(data);
            } catch (error) {
                setMazosData([]);
                setResultados([]);
                console.error("Error al cargar los mazos:", error);
            }
        };
        fetchMazos();
    }, []);

    // Manejar submit del formulario
    const handleBuscar = (e) => {
        e.preventDefault();
        // Filtrar mazos según inputs (mayúsculas y minúsculas ignoradas)
        const filtered = mazosData.filter((mazo) => {
            const nombreMatch = mazo.nombreMazo
                .toLowerCase()
                .includes(nombreMazo.toLowerCase());
            return nombreMatch;
        });
        setResultados(filtered);
    };

    // Card de mazo optimizada con memo y lazy loading
    const DeckCard = memo(({ mazo }) => (
        <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
            <Link
                to={`/mazo/${mazo.idMazo}`}
                style={{ textDecoration: "none", width: "100%" }}
                className="deck-card h-100 shadow-lg deck-card-fixed"
            >
                <div
                    className="deck-card-bg"
                    style={{
                        backgroundImage:
                            mazo.comandanteMazo && mazo.comandanteMazo.imagenArtCropCarta
                                ? `url('${mazo.comandanteMazo.imagenArtCropCarta}')`
                                : `url('/pattern.png')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: 'brightness(0.55) blur(0.5px)',
                        position: 'absolute',
                        inset: 0,
                        zIndex: 1,
                        transition: 'filter 0.2s',
                    }}
                ></div>
                <div className="deck-card-content d-flex flex-column justify-content-between" style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '1.5rem',
                    height: '100%',
                    color: '#fff',
                    textShadow: '0 2px 12px #000',
                    borderRadius: 18,
                    background: 'rgba(30,30,40,0.18)',
                    boxShadow: '0 4px 24px 0 rgba(31,38,135,0.18)',
                    backdropFilter: 'blur(2.5px)',
                    WebkitBackdropFilter: 'blur(2.5px)'
                }}>
                    <div>
                        <div className="deck-title mb-1" style={{ color: "var(--bone)", fontWeight: 900, fontSize: 22, letterSpacing: 1 }}>{mazo.nombreMazo}</div>
                        <div className="deck-commander">
                            Commander · {mazo.comandanteMazo && mazo.comandanteMazo.imagenUrlCarta && (
                                <img
                                    src={mazo.comandanteMazo.imagenUrlCarta}
                                    width="28"
                                    className="rounded shadow-sm me-1"
                                    alt={mazo.comandanteMazo.nombreCarta}
                                    loading="lazy"
                                />
                            )}
                            {mazo.comandanteMazo
                                ? mazo.comandanteMazo.nombreCarta || "Sin comandante"
                                : "Sin comandante"}
                        </div>
                        <div className="deck-icons mb-2">
                            {(mazo.comandanteMazo?.colorCarta || []).map((color) => (
                                <img
                                    key={color}
                                    src={`https://svgs.scryfall.io/card-symbols/${color}.svg`}
                                    alt={color.toUpperCase()}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="deck-footer mt-2">
                        <span className="deck-user">
                            <i className="bi bi-person-circle me-1" style={{fontSize: 22}}></i>
                            {mazo.usuario ? mazo.usuario.nombreUsuario : "Usuario desconocido"}
                        </span>
                        <span style={{ color: '#ccc', fontSize: 15, marginLeft: 8 }}>
                            {mazo.fechaCreacionMazo
                                ? (() => {
                                    const fecha = new Date(mazo.fechaCreacionMazo);
                                    const ahora = new Date();
                                    const diff = (ahora - fecha) / (1000 * 60);
                                    if (diff < 1) return 'less than a minute ago';
                                    if (diff < 60) return `${Math.floor(diff)} min ago`;
                                    if (diff < 60 * 24) return `${Math.floor(diff/60)} h ago`;
                                    return fecha.toLocaleDateString();
                                })()
                                : ""}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    ));

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
                        <i className="bi bi-people me-2" style={{ color: 'var(--zomp)' }}></i>Mazos de la Comunidad
                    </h2>
                    <div className="row justify-content-center mb-4">
  <div className="col-12 col-md-8 col-lg-6">
    <form className="d-flex" onSubmit={handleBuscar}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar mazo por nombre..."
        value={nombreMazo}
        onChange={e => setNombreMazo(e.target.value)}
        style={{ borderRadius: 12, fontWeight: 500 }}
      />
      <button type="submit" className="btn btn-primary ms-2" style={{ borderRadius: 12, fontWeight: 700, background: 'var(--zomp)', border: 'none' }}>
        Buscar
      </button>
    </form>
  </div>
</div>
                    <div className="row g-4">
                        {resultados.length > 0 ? (
                            resultados.slice(0, 39).map((mazo) => (
                                <DeckCard key={mazo.idMazo} mazo={mazo} />
                            ))
                        ) : (
                            <div className="col-12 text-center text-light fs-4 mt-5">No se encontraron mazos con esos criterios.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BuscarMazos;

/* CSS sugerido para index.css:
.mazo-search-hero-input:focus {
  box-shadow: 0 0 0 4px #00e6ff33 !important;
  background: rgba(255,255,255,0.22) !important;
}
.mazo-search-hero-btn:hover, .mazo-search-hero-btn:focus {
  background: linear-gradient(90deg, #5f7fff 0%, #00e6ff 100%);
  box-shadow: 0 8px 32px #00e6ff77, 0 1.5px 0 #fff;
}
*/
