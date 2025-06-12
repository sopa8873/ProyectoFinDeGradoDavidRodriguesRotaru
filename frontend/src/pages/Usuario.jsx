import React, { useState, memo, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";

// Skeleton loader para el avatar
const AvatarSkeleton = () => (
    <div style={{
        width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg,#e0e0e0 60%,#cfcfcf 100%)",
        margin: "0 auto 1rem auto", animation: "pulse 1.2s infinite"
    }} />
);

// Memoized avatar/profile card
const PerfilLateral = memo(({ avatar, nombre, email }) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    return (
        <div className="card text-center shadow-sm">
            <div className="card-body">
                {!imgLoaded && <AvatarSkeleton />}
                <img
                    src={avatar}
                    className="rounded-circle mb-3 avatar-img-fade"
                    alt="Avatar"
                    width="120"
                    height="120"
                    loading="lazy"
                    style={{ display: imgLoaded ? "block" : "none", transition: "opacity 0.5s" }}
                    onLoad={() => setImgLoaded(true)}
                />
                <h5 className="card-title mb-1">{nombre || "Usuario"}</h5>
                <p className="text-muted mb-2">{email || "usuario@email.com"}</p>
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
    );
});

function Usuario() {
    // Estados para los formularios
    const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    // Memoiza el avatar para evitar renders innecesarios
    const avatarUrl = useMemo(() => "/uploads/avatars/default.jpg", []);

    const handleDatosChange = e => {
        const { id, value } = e.target;
        setForm(f => f[id] === value ? f : { ...f, [id]: value });
    };

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
        <div className="page-root" style={{
            minHeight: '100vh',
            background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`,
            boxShadow: 'inset 0 0 120px 0 #000a',
        }}>
            <Header />
            <main>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10">
                            <div className="row g-4">
                                {/* Perfil lateral */}
                                <div className="col-12 col-md-4">
                                    <div className="glass-card p-4 mb-4 shadow-lg text-center usuario-glass-hover">
                                        <PerfilLateral avatar={avatarUrl} nombre={form.nombre} email={form.email} />
                                    </div>
                                </div>
                                {/* Formulario de edición */}
                                <div className="col-12 col-md-8">
                                    <div className="glass-card shadow-lg mb-4 usuario-glass-hover">
                                        <div className="card-header bg-primary text-white" style={{ borderRadius: '18px 18px 0 0', background: 'linear-gradient(90deg, var(--zomp), var(--paynes-gray))', boxShadow: '0 2px 12px #0007' }}>
                                            <h5 className="mb-0">
                                                <i className="bi bi-pencil-square me-2"></i>Editar datos personales
                                            </h5>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleDatosSubmit} autoComplete="off">
                                                <div className="mb-3">
                                                    <label htmlFor="nombre" className="form-label">
                                                        Nombre
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="nombre"
                                                        placeholder="Tu nombre"
                                                        value={form.nombre}
                                                        onChange={handleDatosChange}
                                                        style={{ borderRadius: 12, fontWeight: 600 }}
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
                                                        value={form.email}
                                                        onChange={handleDatosChange}
                                                        style={{ borderRadius: 12 }}
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
                                                        value={form.telefono}
                                                        onChange={handleDatosChange}
                                                        style={{ borderRadius: 12 }}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary px-4" style={{ borderRadius: 12, fontWeight: 700 }}>
                                                    <i className="bi bi-save"></i> Guardar cambios
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="glass-card shadow-lg mt-4 usuario-glass-hover">
                                        <div className="card-header bg-secondary text-white" style={{ borderRadius: '18px 18px 0 0', background: 'linear-gradient(90deg, var(--bole), var(--paynes-gray))', boxShadow: '0 2px 12px #0007' }}>
                                            <h6 className="mb-0">
                                                <i className="bi bi-key me-2"></i>Cambiar contraseña
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handlePasswordSubmit} autoComplete="off">
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
                                                        onChange={e => setPassword(e.target.value)}
                                                        style={{ borderRadius: 12 }}
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
                                                        onChange={e => setPassword2(e.target.value)}
                                                        style={{ borderRadius: 12 }}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-secondary px-4" style={{ borderRadius: 12, fontWeight: 700 }}>
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
            </main>
            <Footer />
        </div>
    );
}

export default Usuario;
// CSS para animaciones y hover
// Agrega esto a index.css si no existe:
/*
.usuario-glass-hover {
  transition: transform 0.18s, box-shadow 0.18s;
}
.usuario-glass-hover:hover {
  transform: scale(1.025);
  box-shadow: 0 12px 40px 0 rgba(31,38,135,0.45);
}
@keyframes pulse {
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}
.avatar-img-fade { opacity: 1; transition: opacity 0.5s; }
*/