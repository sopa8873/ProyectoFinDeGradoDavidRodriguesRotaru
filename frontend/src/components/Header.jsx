import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem("idUsuario");
    const nombreUsuario = localStorage.getItem("nombreUsuario");
    const email = localStorage.getItem("email");
    const avatarUsuario = localStorage.getItem("avatarUsuario") || "/uploads/avatars/default.jpg";

    const handleLogout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("email");
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("avatarUsuario");
        navigate("/login");
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark"
            style={{ backgroundColor: "var(--paynes-gray)", color: "var(--bole)" }}
        >
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    to="/"
                    style={{ color: "var(--bone)", fontWeight: "bold" }}
                >
                    MTGDistrict
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    style={{ borderColor: "var(--bone)" }}
                >
                    <span
                        className="navbar-toggler-icon"
                        style={{ filter: "invert(40%) sepia(15%) saturate(500%) hue-rotate(160deg)" }}
                    ></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {["Inicio", "Buscar Mazos", "Mis Mazos", "Mis Colecciones"].map((text, idx) => {
                            const toPaths = ["/", "/buscar-mazos", "/mazos", "/colecciones"];
                            return (
                                <li key={idx} className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to={toPaths[idx]}
                                        style={{ color: "var(--bone)" }}
                                    >
                                        {text}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle d-flex align-items-center"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "var(--bone)" }} // Cambiado a --bone para igualar el color
                            >
                                <img
                                    src={avatarUsuario}
                                    alt="Avatar"
                                    className="rounded-circle me-2"
                                    width="32"
                                    height="32"
                                    style={{ border: "1px solid var(--paynes-gray)" }}
                                />
                                {nombreUsuario ? nombreUsuario : "Usuario"}
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="userDropdown"
                                style={{ backgroundColor: "var(--zomp)", color: "var(--bole)" }}
                            >
                                <li>
                                    <Link className="dropdown-item" to={`/usuario/${nombreUsuario}`}>
                                        Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/usuario">
                                        Configuración
                                    </Link>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Cerrar sesión
                                    </button>
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
