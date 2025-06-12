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
        <>
            <Header />
            <div className="container my-4">
                <h2 className="mb-4">Tus Colecciones</h2>
                <button className="btn btn-primary mb-3">
                    <i className="bi bi-plus-circle"></i> Añadir colección
                </button>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-info">
                            <tr>
                                <th>Nombre</th>
                                <th>Nº Cartas</th>
                                <th>Última modificación</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colecciones.map((col, idx) => (
                                <tr key={idx}>
                                    <td>{col.nombreColeccion}</td>
                                    <td>{col.cartas ? col.cartas.length : 0}</td>
                                    <td>{col.fechaCreacionColeccion}</td>
                                    <td>
                                        <button className="btn btn-outline-primary btn-sm me-1">
                                            <i className="bi bi-eye"></i> Ver
                                        </button>
                                        <button className="btn btn-outline-warning btn-sm me-1">
                                            <i className="bi bi-pencil"></i> Editar
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm">
                                            <i className="bi bi-trash"></i> Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Colecciones;
