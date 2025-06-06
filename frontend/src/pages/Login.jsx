import React, { useState } from "react";

function Login() {
    const [activeTab, setActiveTab] = useState("login");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerRepeatPassword, setRegisterRepeatPassword] = useState("");
    const [registerCheck, setRegisterCheck] = useState(false);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setLoginError("");
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        try {
            const response = await fetch("/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    emailUsuario: loginEmail,
                    passwordUsuario: loginPassword,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("jwt", data.token);
                window.location.href = "/homepage";
            } else {
                setLoginError("Credenciales incorrectas");
            }
        } catch (err) {
            setLoginError("Error de conexión");
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar el registro real
        alert("Registro enviado (implementa la lógica aquí)");
    };

    return (
        <div className="bodyLogin d-flex flex-column justify-content-center align-items-center">
            <div className="row w-100">
                <div className="col-12 text-center mb-4">
                    <h1>MTGDistrict</h1>
                    <h2>Bienvenido a tu aplicación de gestión de mazos</h2>
                </div>
                <div className="col-12 col-md-6 offset-md-3 bg-seccion p-4 rounded shadow">
                    {/* Navegación tipo Pills */}
                    <ul className="nav nav-pills nav-justified mb-5" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link shadow rounded ${activeTab === "login" ? "active" : ""}`}
                                id="tab-login"
                                onClick={() => handleTabClick("login")}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "login"}
                            >
                                Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link shadow rounded ${activeTab === "register" ? "active" : ""}`}
                                id="tab-register"
                                onClick={() => handleTabClick("register")}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === "register"}
                            >
                                Register
                            </button>
                        </li>
                    </ul>
                    {/* Contenido de las pestañas */}
                    <div className="tab-content">
                        {/* Login */}
                        <div className={`tab-pane fade ${activeTab === "login" ? "show active" : ""}`} id="pills-login" role="tabpanel">
                            <form onSubmit={handleLoginSubmit}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="emailUsuario"
                                        className="form-control"
                                        required
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="emailUsuario">
                                        Email
                                    </label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="passwordUsuario"
                                        className="form-control"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="passwordUsuario">
                                        Contraseña
                                    </label>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-6 d-flex justify-content-center">
                                        <a href="#!">¿Olvidaste tu contraseña?</a>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    Iniciar sesión
                                </button>
                            </form>
                            {loginError && (
                                <div className="text-danger mt-2">{loginError}</div>
                            )}
                        </div>
                        {/* Registro */}
                        <div className={`tab-pane fade ${activeTab === "register" ? "show active" : ""}`} id="pills-register" role="tabpanel">
                            <form onSubmit={handleRegisterSubmit}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="registerUsername"
                                        className="form-control"
                                        required
                                        value={registerUsername}
                                        onChange={(e) => setRegisterUsername(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerUsername">
                                        Nombre de usuario
                                    </label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="registerEmail"
                                        className="form-control"
                                        required
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerEmail">
                                        Email
                                    </label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="registerPassword"
                                        className="form-control"
                                        required
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerPassword">
                                        Contraseña
                                    </label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="registerRepeatPassword"
                                        className="form-control"
                                        required
                                        value={registerRepeatPassword}
                                        onChange={(e) => setRegisterRepeatPassword(e.target.value)}
                                    />
                                    <label className="form-label" htmlFor="registerRepeatPassword">
                                        Repite la contraseña
                                    </label>
                                </div>
                                <div className="form-check d-flex justify-content-center mb-4">
                                    <input
                                        className="form-check-input me-2"
                                        type="checkbox"
                                        id="registerCheck"
                                        required
                                        checked={registerCheck}
                                        onChange={(e) => setRegisterCheck(e.target.checked)}
                                    />
                                    <label className="form-check-label" htmlFor="registerCheck">
                                        Acepto los <a href="#!">términos y condiciones</a>
                                    </label>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mb-3">
                                    Registrarse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;