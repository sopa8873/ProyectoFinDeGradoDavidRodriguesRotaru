import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axiosService from "../services/axiosService";
import { Link } from "react-router-dom";

function Mazos() {
    const [mazos, setMazos] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p className="m-3" style={{ color: "var(--bole)" }}>Cargando mazos...</p>;

    return (
        <>
            <Header />
            <div className="container my-4">
                <h2 className="mb-4" style={{ color: "var(--paynes-gray)", fontWeight: "bold" }}>Tus Mazos</h2>
                <button className="btn mb-3" style={{ background: "var(--zomp)", color: "var(--seasalt)", fontWeight: "bold" }}>
                    <i className="bi bi-plus-circle"></i> Crear nuevo mazo
                </button>
                <div className="table-responsive">
                    <table className="table table-hover" style={{ background: "var(--seasalt)", color: "var(--bole)" }}>
                        <thead style={{ background: "var(--bone)", color: "var(--bole)" }}>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Formato</th>
                                <th>Comandante</th>
                                <th>Visibilidad</th>
                                <th>Votos +</th>
                                <th>Cartas</th>
                                <th>Fecha creación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mazos.map((mazo) => (
                                <tr key={mazo.idMazo}>
                                    <td style={{ fontWeight: "bold", color: "var(--paynes-gray)" }}>{mazo.nombreMazo}</td>
                                    <td>{mazo.descripcionMazo}</td>
                                    <td>{mazo.formatoMazo}</td>
                                    <td>{mazo.comandanteMazo || "—"}</td>
                                    <td>
                                        <span style={{
                                            color: mazo.visibilidadMazo ? "var(--zomp)" : "var(--bole)",
                                            fontWeight: "bold"
                                        }}>
                                            {mazo.visibilidadMazo ? "Público" : "Privado"}
                                        </span>
                                    </td>
                                    <td>{mazo.votacionesPositivasMazo ?? 0}</td>
                                    <td>{mazo.cartas ? mazo.cartas.length : 0}</td>
                                    <td>{mazo.fechaCreacionMazo && mazo.fechaCreacionMazo.split("T")[0]}</td>
                                    <td>
                                        <Link
                                            to={`/mazo/${mazo.idMazo}`}
                                            className="btn btn-outline-primary btn-sm me-1"
                                            style={{ borderColor: "var(--zomp)", color: "var(--zomp)" }}
                                        >
                                            <i className="bi bi-eye"></i> Ver
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            style={{ borderColor: "var(--bole)", color: "var(--bole)" }}
                                        >
                                            <i className="bi bi-trash"></i> Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Mazos;
