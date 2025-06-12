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
    console.log("Usuario logueado ID:", usuarioLogueadoId);
    console.log("Dueño del mazo ID:", mazo.usuario ? mazo.usuario.idUsuario : "N/A");
    console.log("Es dueño del mazo:", esDueno);
    return (
        <div className="page-root">
            <Header />
            <div className="container mt-5">
                <div className="card shadow-sm p-4" style={{ background: "var(--seasalt)", border: "1px solid var(--paynes-gray)", color: "var(--bole)" }}>
                    {/* Dueño del mazo */}
                    {mazo.usuario && (
                        <div className="mb-3 d-flex align-items-center">
                            <Link
                                to={`/usuario/${mazo.usuario.nombreUsuario}`}
                                style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
                            >
                                <img
                                    src={mazo.usuario.avatarUsuario || "/uploads/avatars/default.jpg"}
                                    alt={mazo.usuario.nombreUsuario}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        marginRight: 10,
                                        border: "2px solid var(--zomp)",
                                        background: "var(--bone)"
                                    }}
                                />
                                <span style={{ color: "var(--paynes-gray)", fontWeight: "bold" }}>
                                {mazo.usuario.nombreUsuario}
                                </span>
                            </Link>
                        </div>
                    )}

                    <h2 style={{ color: "var(--paynes-gray)", fontWeight: "bold" }}>{mazo.nombreMazo}</h2>
                    <p><strong>Descripción:</strong> {mazo.descripcionMazo}</p>
                    <p><strong>Formato:</strong> {mazo.formatoMazo}</p>
                    <p><strong>Comandante:</strong>{" "}
  {mazo.comandanteMazo
    ? mazo.comandanteMazo.nombreCarta || "Sin nombre"
    : "N/A"}
</p>
                    <p><strong>Fecha de creación:</strong> {mazo.fechaCreacionMazo && mazo.fechaCreacionMazo.split("T")[0]}</p>
                    <p><strong>Visibilidad:</strong> {mazo.visibilidadMazo ? "Público" : "Privado"}</p>
                    <p><strong>Votos positivos:</strong> {mazo.votacionesPositivasMazo}</p>

                    {esDueno && (
                        <div className="mb-3">
                            {/* Formulario para añadir carta */}
                            <form onSubmit={handleAddCarta} className="d-flex align-items-center mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Nombre de la carta"
                                    value={nuevaCarta}
                                    onChange={e => setNuevaCarta(e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    className="form-control me-2"
                                    style={{ width: 80 }}
                                    min={1}
                                    value={cantidad}
                                    onChange={e => setCantidad(Number(e.target.value))}
                                    required
                                />
                                <button className="btn btn-success" type="submit" style={{ background: "var(--zomp)", border: "none" }}>
                                    Añadir carta
                                </button>
                            </form>
                            {addError && <div className="alert alert-danger">{addError}</div>}
                            {addSuccess && <div className="alert alert-success">{addSuccess}</div>}
                            <button className="btn btn-danger me-2" style={{ background: "var(--bole)", border: "none" }}>
                                Borrar mazo
                            </button>
                            {!mazo.visibilidadMazo && (
                                <button className="btn btn-outline-primary" style={{ borderColor: "var(--zomp)", color: "var(--zomp)" }}>
                                    Hacer público
                                </button>
                            )}
                        </div>
                    )}

                    {mazo.comandanteMazo ? (
                        <div className="mb-4 d-flex align-items-center" style={{ background: "var(--bone)", borderRadius: 8, padding: 12, border: "1px solid var(--zomp)" }}>
                            <div style={{ position: "relative", display: "inline-block" }}>
                                <img
                                    src={mazo.comandanteMazo.imagenUrlCarta}
                                    alt={mazo.comandanteMazo.nombreCarta}
                                    style={{ width: 60, height: 84, objectFit: "cover", borderRadius: 6, border: "2px solid var(--zomp)", marginRight: 16 }}
                                    className="mini-carta"
                                />
                                <div className="zoom-carta">
                                    <img
                                        src={mazo.comandanteMazo.imagenUrlCarta}
                                        alt={mazo.comandanteMazo.nombreCarta}
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
                            <div>
                                <div style={{ fontWeight: "bold", fontSize: 18, color: "var(--paynes-gray)" }}>
                                    {mazo.comandanteMazo.nombreCarta}
                                </div>
                                <div style={{ color: "var(--bole)" }}>
                                    {mazo.comandanteMazo.tipoCarta}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mb-4" style={{ color: "var(--bole)", fontStyle: "italic" }}>
                            Sin comandante
                        </div>
                    )}

                    <h4 style={{ color: "var(--zomp)", fontWeight: "bold" }}>Cartas</h4>
                    <ul className="list-group mb-4">
                        {mazo.cartas.map((mazoCarta, idx) => {
                            console.log("mazoCarta:", mazoCarta); // <-- Esto te muestra cada objeto en la consola
                            return (
                                <li key={idx} className="list-group-item d-flex align-items-center" style={{ background: "var(--bone)", color: "var(--bole)" }}>
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
                                                    borderRadius: 4,
                                                    border: "1px solid var(--paynes-gray)",
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
                                    <span style={{ fontWeight: "bold" }}>{mazoCarta.carta?.nombreCarta}</span>
                                    <span style={{ marginLeft: "auto", color: "var(--paynes-gray)" }}>x{mazoCarta.cantidad}</span>
                                    <button
                                        className="btn-circular-remove"
                                        title="Eliminar carta"
                                        onClick={() => handleDeleteCarta(mazoCarta.carta?.nombreCarta)}
                                        style={{ marginLeft: 10 }}
                                    >
                                        &minus;
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PaginaMazo;