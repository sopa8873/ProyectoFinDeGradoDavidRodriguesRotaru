import React from "react";
import { Link } from "react-router-dom";

function Header() {
    const handleLogout = () => {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MTGDistrict</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/buscar-mazos">Buscar Mazos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/mazos">Mazos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/usuario">Usuario</Link>
                        </li>
                    </ul>
                    {/* Avatar y menú de usuario */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="/uploads/avatars/default.jpg"
                                    alt="Avatar"
                                    className="rounded-circle me-2"
                                    width="32"
                                    height="32"
                                />
                                Usuario
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                <li>
                                    <Link className="dropdown-item" to="/usuario">Perfil</Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" to="/usuario">Configuración</a>
                                </li>
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" to="/login" onClick={handleLogout}>Cerrar sesión</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;