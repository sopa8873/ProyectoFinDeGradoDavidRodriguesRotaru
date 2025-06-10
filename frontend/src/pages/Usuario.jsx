import React, { useState } from "react";
import Header from "../components/Header";

function Usuario() {
    // Estados para los formularios
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleDatosSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar cambios de datos personales
        alert("Datos personales guardados (implementa la lógica aquí)");
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        // Lógica para cambiar contraseña
        if (password !== password2) {
            alert("Las contraseñas no coinciden");
            return;
        }
        alert("Contraseña cambiada (implementa la lógica aquí)");
    };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10">
                        <div className="row g-4">
                            {/* Perfil lateral */}
                            <div className="col-12 col-md-4">
                                <div className="card text-center shadow-sm">
                                    <div className="card-body">
                                        <img
                                            src="/public/uploads/avatars/default.jpg" // Cambia esta ruta por la de tu avatar
                                            className="rounded-circle mb-3"
                                            alt="Avatar"
                                            width="120"
                                            height="120"
                                        />
                                        <h5 className="card-title mb-1">Usuario</h5>
                                        <p className="text-muted mb-2">usuario@email.com</p>
                                        <button type="button" className="btn btn-outline-secondary btn-sm mb-2">
                                            <i className="bi bi-upload"></i> Cambiar avatar
                                        </button>
                                        <div>
                                            <button type="button" className="btn btn-danger btn-sm mt-2">
                                                <i className="bi bi-trash"></i> Eliminar cuenta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Formulario de edición */}
                            <div className="col-12 col-md-8">
                                <div className="card shadow-sm">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="mb-0">
                                            <i className="bi bi-pencil-square me-2"></i>Editar datos personales
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleDatosSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="nombre" className="form-label">
                                                    Nombre
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nombre"
                                                    placeholder="Tu nombre"
                                                    value={nombre}
                                                    onChange={(e) => setNombre(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">
                                                    Correo electrónico
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    placeholder="tucorreo@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="telefono" className="form-label">
                                                    Teléfono
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    id="telefono"
                                                    placeholder="Tu teléfono"
                                                    value={telefono}
                                                    onChange={(e) => setTelefono(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="bi bi-save"></i> Guardar cambios
                                            </button>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow-sm mt-4">
                                    <div className="card-header bg-secondary text-white">
                                        <h6 className="mb-0">
                                            <i className="bi bi-key me-2"></i>Cambiar contraseña
                                        </h6>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handlePasswordSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">
                                                    Nueva contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    placeholder="Nueva contraseña"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password2" className="form-label">
                                                    Repetir contraseña
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="password2"
                                                    placeholder="Repite la contraseña"
                                                    value={password2}
                                                    onChange={(e) => setPassword2(e.target.value)}
                                                />
                                            </div>
                                            <button type="submit" className="btn btn-secondary">
                                                <i className="bi bi-key"></i> Cambiar contraseña
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Fin formulario */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Usuario;