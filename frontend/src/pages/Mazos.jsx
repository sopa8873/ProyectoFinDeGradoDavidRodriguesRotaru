import React, { useState, useEffect } from "react";
import Header from "../components/Header";

function Mazos() {
    const [activeTab, setActiveTab] = useState("mazos");
    const [mazos, setMazos] = useState([]);
    const [colecciones, setColecciones] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("jwt");

            const response = await fetch("/api/mazos", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            setMazos(data.mazos);
            setColecciones(data.colecciones);
        };

        fetchData();
    }, []);

    return (
        <>
            <Header />
            <div className="container mt-5">
                {/* Nav tabs */}
                <ul className="nav nav-tabs mb-4" id="mazosTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "mazos" ? "active" : ""}`}
                            id="mazos-tab"
                            type="button"
                            role="tab"
                            aria-controls="mazos"
                            aria-selected={activeTab === "mazos"}
                            onClick={() => setActiveTab("mazos")}
                        >
                            Mazos
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className={`nav-link ${activeTab === "colecciones" ? "active" : ""}`}
                            id="colecciones-tab"
                            type="button"
                            role="tab"
                            aria-controls="colecciones"
                            aria-selected={activeTab === "colecciones"}
                            onClick={() => setActiveTab("colecciones")}
                        >
                            Colecciones
                        </button>
                    </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content" id="mazosTabsContent">
                    {/* Mazos */}
                    <div
                        className={`tab-pane fade ${activeTab === "mazos" ? "show active" : ""}`}
                        id="mazos"
                        role="tabpanel"
                        aria-labelledby="mazos-tab"
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Tus Mazos</h2>
                            <button className="btn btn-success">
                                <i className="bi bi-plus-circle"></i> Crear nuevo mazo
                            </button>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Buscar mazo..." />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
                                <thead className="table-primary">
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Formato</th>
                                        <th>Última modificación</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mazos.map((mazo, idx) => (
                                        <tr key={idx}>
                                            <td>{mazo.nombre}</td>
                                            <td>{mazo.formato}</td>
                                            <td>{mazo.ultima}</td>
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
                    {/* Colecciones */}
                    <div
                        className={`tab-pane fade ${activeTab === "colecciones" ? "show active" : ""}`}
                        id="colecciones"
                        role="tabpanel"
                        aria-labelledby="colecciones-tab"
                    >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="mb-0">Tus Colecciones</h2>
                            <button className="btn btn-primary">
                                <i className="bi bi-plus-circle"></i> Añadir colección
                            </button>
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Buscar colección..." />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-hover align-middle">
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
                                            <td>{col.nombre}</td>
                                            <td>{col.cartas}</td>
                                            <td>{col.ultima}</td>
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
                </div>
            </div>
        </>
    );
}

export default Mazos;