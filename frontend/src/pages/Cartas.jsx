import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axiosService from "../services/axiosService";
import "../index.css";

const PAGE_SIZE = 12; // Ajustado para 4 cartas por fila (3 filas completas)

function Cartas() {
  const [cartas, setCartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [modalCarta, setModalCarta] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosService.get("/cartas")
      .then(data => {
        setCartas(data);
        setTotal(data.length);
      })
      .catch(() => setCartas([]))
      .finally(() => setLoading(false));
  }, []);

  // Paginación
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const cartasPagina = cartas.slice(start, end);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="page-root" style={{ minHeight: '100vh', background: `linear-gradient(rgba(30,40,50,0.85),rgba(30,40,50,0.93)), url('/backgroundMagic2-opacity.jpg') center/cover no-repeat fixed`, boxShadow: 'inset 0 0 120px 0 #000a' }}>
      <Header />
      <main>
        <div className="container py-5">
          <h2 className="mb-4 text-center" style={{ color: 'var(--bone)', fontWeight: 900, letterSpacing: 1, textShadow: '0 2px 16px #000' }}>
            <i className="bi bi-collection me-2" style={{ color: 'var(--zomp)' }}></i>
            Todas las cartas
          </h2>
          {loading ? <Loader fullscreen={false} /> : (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 g-lg-5 mb-4">
                {cartasPagina.map((carta, i) => (
                  <div key={carta.idCarta || i} className="col d-flex justify-content-center">
                    <div
                      className="card carta-glass carta-hover border-0 shadow-lg p-0"
                      style={{
                        borderRadius: 18,
                        background: 'rgba(255,255,255,0.13)',
                        boxShadow: '0 4px 24px 0 rgba(31,38,135,0.25)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        display: 'inline-block',
                        padding: 0,
                        width: 'auto',
                        height: 'auto',
                        minHeight: 'unset',
                        maxWidth: 290
                      }}
                      onClick={() => setModalCarta(carta)}
                      title="Ver carta ampliada"
                    >
                      <img
                        src={carta.imagenUrlCarta}
                        alt={carta.nombreCarta}
                        className="img-fluid rounded"
                        style={{
                          display: 'block',
                          width: '100%',
                          height: 'auto',
                          objectFit: "contain",
                          borderRadius: 18,
                          border: '2px solid var(--zomp)',
                          boxShadow: '0 2px 12px #0007',
                          background: 'transparent',
                          maxWidth: 270,
                          maxHeight: 360,
                          margin: 0
                        }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Paginación */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <button className="btn btn-outline-light px-3" style={{ borderRadius: 10, fontWeight: 700 }} disabled={page === 1} onClick={() => setPage(page - 1)}>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <span style={{ color: 'var(--bone)', fontWeight: 700, fontSize: 18 }}>
                    Página {page} de {totalPages}
                  </span>
                  <button className="btn btn-outline-light px-3" style={{ borderRadius: 10, fontWeight: 700 }} disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              )}
              {/* Modal de carta ampliada */}
              {modalCarta && (
                <div className="modal-carta-backdrop" onClick={() => setModalCarta(null)}>
                  <div className="modal-carta" onClick={e => e.stopPropagation()}>
                    <img src={modalCarta.imagenUrlCarta} alt={modalCarta.nombreCarta} className="img-fluid rounded" style={{ maxHeight: 550, borderRadius: 18, border: '3px solid var(--zomp)', boxShadow: '0 6px 32px #000b', width: 'auto', height: 'auto', maxWidth: '100%' }} />
                    <div className="mt-3 text-center" style={{ color: 'var(--bone)', fontWeight: 700, fontSize: 22, textShadow: '0 2px 12px #000' }}>{modalCarta.nombreCarta}</div>
                    <button className="btn btn-outline-light mt-3" style={{ borderRadius: 12, fontWeight: 700 }} onClick={() => setModalCarta(null)}>
                      Cerrar
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Cartas;
