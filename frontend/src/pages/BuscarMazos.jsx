import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axiosService from "../services/axiosService";

function BuscarMazos() {
    // Estados para inputs
    const [nombreMazo, setNombreMazo] = useState("");
    const [formato, setFormato] = useState("");
    const [usuario, setUsuario] = useState("");
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
            const formatoMatch =
                formato === "" || formato === "Formato"
                    ? true
                    : mazo.formatoMazo.toLowerCase() === formato.toLowerCase();
            const usuarioMatch = mazo.usuario && mazo.usuario.nombreUsuario
                ? mazo.usuario.nombreUsuario.toLowerCase().includes(usuario.toLowerCase())
                : false;

            return nombreMatch && formatoMatch && usuarioMatch;
        });
        setResultados(filtered);
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2 className="mb-4 text-center">
                    <i className="bi bi-people me-2"></i>Mazos de la Comunidad
                </h2>
                {/* Barra de búsqueda eliminada */}
                <div className="row g-4">
                    {resultados.length > 0 ? (
                        resultados.map((mazo) => (
                            <div key={mazo.idMazo} className="col-12 col-md-6 col-lg-4">
                                <Link
                                    to={`/mazo/${mazo.idMazo}`}
                                    style={{ textDecoration: "none" }}
                                    className="card deck-card h-100"
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
                                            minHeight: 180,
                                            borderRadius: "8px 8px 0 0"
                                        }}
                                    ></div>
                                    <div className="deck-card-content">
                                        <div>
                                            <div
                                                className="deck-title"
                                                style={{ color: "var(--paynes-gray)", fontWeight: "bold" }}
                                            >
                                                {mazo.nombreMazo}
                                            </div>
                                            <div className="deck-commander">
                                                Commander ·{" "}
                                                {mazo.comandanteMazo && mazo.comandanteMazo.imagenUrlCarta && (
                                                    <img
                                                        src={mazo.comandanteMazo.imagenUrlCarta}
                                                        width="28"
                                                        className="rounded shadow-sm me-1"
                                                        alt={mazo.comandanteMazo.nombreCarta}
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
                                                    />
                                                ))}
                                            </div>
                                            <div className="deck-meta">
                                                <span>
                                                    <i className="bi bi-heart-fill text-danger"></i> {mazo.likes}
                                                </span>
                                                <span>
                                                    <i className="bi bi-eye"></i> {mazo.views}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="deck-footer">
                                            <span className="deck-user">
                                                {mazo.usuario && mazo.usuario.avatarUsuario && (
                                                    <img
                                                        src={mazo.usuario.avatarUsuario}
                                                        alt={mazo.usuario.nombreUsuario}
                                                        style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 6 }}
                                                    />
                                                )}
                                                {mazo.usuario ? mazo.usuario.nombreUsuario : "Usuario desconocido"}
                                            </span>
                                            <span>
                                                {mazo.fechaCreacionMazo
                                                    ? mazo.fechaCreacionMazo.split("T")[0]
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No se encontraron mazos con esos criterios.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default BuscarMazos;
