import React, { useState, useMemo, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../index.css";
import { useToast } from "../components/ToastContext";
import Loader from "../components/Loader";
import axiosService from "../services/axiosService";

function Usuario() {
    const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const avatarUrl = useMemo(() => "/uploads/avatars/default.jpg", []);

    useEffect(() => {
        setLoading(true);
        axiosService.get("/usuario/perfil")
            .then(data => {
                setForm({
                    nombre: data.nombreUsuario || "",
                    email: data.emailUsuario || "",
                    telefono: data.telefonoUsuario || ""
                });
            })
            .catch(() => showToast("Error al cargar perfil", "error"))
            .finally(() => setLoading(false));
    }, []);

    const handleDatosChange = e => {
        const { id, value } = e.target;
        setForm(f => f[id] === value ? f : { ...f, [id]: value });
    };

    const handleDatosSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosService.put("/usuario", form);
            showToast("Datos personales guardados", "success");
        } catch (err) {
            showToast("Error al guardar los datos", "error");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            showToast("Las contraseñas no coinciden", "error");
            return;
        }
        setLoading(true);
        try {
            await axiosService.put("/usuario/password", { password });
            showToast("Contraseña cambiada correctamente", "success");
            setPassword("");
            setPassword2("");
        } catch (err) {
            showToast("Error al cambiar la contraseña", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-root" style={{ minHeight: '100vh', background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`, boxShadow: 'inset 0 0 120px 0 #000a', display: 'flex', flexDirection: 'column' }}>
            {loading && <Loader fullscreen />}
            <Header />
            <main style={{ flex: 1, width: '100%', padding: '40px 0' }}>
                <div className="row justify-content-center align-items-start g-5 mx-0" style={{ width: '100%' }}>
                    {/* Panel avatar y acciones */}
                    <div className="col-12 col-md-4 mb-4 mb-md-0">
                        <div className="glass-card p-4 shadow-lg text-center usuario-glass-hover" style={{ borderRadius: 24, background: 'rgba(30,40,50,0.92)', border: '2px solid var(--zomp)' }}>
                            <div className="mb-3 d-flex flex-column align-items-center">
                                <img
                                    src={avatarUrl}
                                    alt="Avatar"
                                    width="120"
                                    height="120"
                                    className="rounded-circle avatar-img-fade shadow-lg"
                                    style={{ border: '4px solid var(--zomp)', background: 'var(--bone)', objectFit: 'cover', marginBottom: 8 }}
                                />
                                <label htmlFor="avatar-upload" className="btn btn-outline-secondary btn-sm mb-2" style={{ borderRadius: 10, fontWeight: 600 }}>
                                    <i className="bi bi-upload"></i> Cambiar avatar
                                </label>
                                <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} />
                            </div>
                            <h5 className="mb-1" style={{ color: 'var(--bone)', fontWeight: 700 }}>{form.nombre || "Usuario"}</h5>
                            <p className="text-muted mb-2" style={{ fontSize: 15 }}>{form.email || "usuario@email.com"}</p>
                            <button type="button" className="btn btn-danger btn-sm mt-2" style={{ borderRadius: 10, fontWeight: 600 }}>
                                <i className="bi bi-trash"></i> Eliminar cuenta
                            </button>
                        </div>
                    </div>
                    {/* Panel principal de edición */}
                    <div className="col-12 col-md-8">
                        <div className="row g-4">
                            {/* Datos personales */}
                            <div className="col-12">
                                <div className="glass-card p-4 shadow-lg mb-4 usuario-glass-hover" style={{ borderRadius: 24, background: 'rgba(255,255,255,0.10)', border: '1.5px solid var(--zomp)', backdropFilter: 'blur(8px)' }}>
                                    <div className="card-header bg-primary text-white usuario-config-header usuario-config-header-datos" style={{ borderRadius: '18px 18px 0 0', background: 'linear-gradient(90deg, var(--zomp), var(--paynes-gray))', fontWeight: 900, fontSize: '1.25rem', letterSpacing: 1 }}>
                                        <i className="bi bi-pencil-square me-2"></i>Editar datos personales
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleDatosSubmit} autoComplete="off">
                                            <div className="row g-3">
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="nombre" className="form-label" style={{ color: 'var(--zomp)', fontWeight: 600 }}>Nombre</label>
                                                    <input
                                                        type="text"
                                                        className="form-control usuario-input"
                                                        id="nombre"
                                                        placeholder="Tu nombre"
                                                        value={form.nombre}
                                                        onChange={handleDatosChange}
                                                        style={{ borderRadius: 12, fontWeight: 600 }}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="email" className="form-label" style={{ color: 'var(--zomp)', fontWeight: 600 }}>Correo electrónico</label>
                                                    <input
                                                        type="email"
                                                        className="form-control usuario-input"
                                                        id="email"
                                                        placeholder="tucorreo@email.com"
                                                        value={form.email}
                                                        onChange={handleDatosChange}
                                                        style={{ borderRadius: 12 }}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="telefono" className="form-label" style={{ color: 'var(--zomp)', fontWeight: 600 }}>Teléfono</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control usuario-input"
                                                        id="telefono"
                                                        placeholder="Tu teléfono"
                                                        value={form.telefono}
                                                        onChange={handleDatosChange}
                                                        style={{ borderRadius: 12 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-4">
                                                <button type="submit" className="btn btn-zomp px-4 fw-bold" style={{ borderRadius: 12, fontWeight: 700,  background: 'var(--zomp)', color: '#fff' }}>
                                                    <i className="bi bi-save me-2"></i> Guardar cambios
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Cambiar contraseña */}
                            <div className="col-12">
                                <div className="glass-card p-4 shadow-lg usuario-glass-hover" style={{ borderRadius: 24, background: 'rgba(255,255,255,0.10)', border: '1.5px solid var(--bole)', backdropFilter: 'blur(8px)' }}>
                                    <div className="card-header bg-secondary text-white usuario-config-header usuario-config-header-pass" style={{ borderRadius: '18px 18px 0 0', background: 'linear-gradient(90deg, var(--bole), var(--paynes-gray))', fontWeight: 900, fontSize: '1.15rem', letterSpacing: 1 }}>
                                        <i className="bi bi-key me-2"></i>Cambiar contraseña
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handlePasswordSubmit} autoComplete="off">
                                            <div className="row g-3">
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="password" className="form-label" style={{ color: 'var(--bole)', fontWeight: 600 }}>Nueva contraseña</label>
                                                    <input
                                                        type="password"
                                                        className="form-control usuario-input"
                                                        id="password"
                                                        placeholder="Nueva contraseña"
                                                        value={password}
                                                        onChange={e => setPassword(e.target.value)}
                                                        style={{ borderRadius: 12 }}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label htmlFor="password2" className="form-label" style={{ color: 'var(--bole)', fontWeight: 600 }}>Repetir contraseña</label>
                                                    <input
                                                        type="password"
                                                        className="form-control usuario-input"
                                                        id="password2"
                                                        placeholder="Repite la contraseña"
                                                        value={password2}
                                                        onChange={e => setPassword2(e.target.value)}
                                                        style={{ borderRadius: 12 }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-end mt-4">
                                                <button type="submit" className="btn btn-bole px-4 fw-bold" style={{ borderRadius: 12, fontWeight: 700, background: 'var(--bole)', color: '#fff' }}>        
                                                    <i className="bi bi-key me-2"></i> Cambiar contraseña
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
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
/*
.usuario-bg {
  background: linear-gradient(120deg, #232b33 60%, #2e3a44 100%) !important;
}
.usuario-profile-card {
  min-height: 420px;
  border-radius: 2rem;
  background: rgba(30,40,50,0.92);
  box-shadow: 0 8px 32px #000b;
}
.usuario-avatar-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
}
.usuario-avatar-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid var(--zomp);
}
.usuario-avatar-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(30,40,50,0.55);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.2s;
}
.usuario-avatar-wrapper:hover .usuario-avatar-overlay {
  opacity: 1;
}
.btn-zomp {
  background: var(--zomp);
  color: #fff;
  border: none;
}
.btn-zomp:hover {
  background: #1dbb8b;
  color: #fff;
}
.btn-bole {
  background: var(--bole);
  color: #fff;
  border: none;
}
.btn-bole:hover {
  background: #a05c3b;
  color: #fff;
}
.usuario-input:focus {
  border-color: var(--zomp);
  box-shadow: 0 0 0 0.15rem rgba(29,187,139,0.15);
}
*/