import React from "react";
import Header from "../components/Header";

function BuscarMazos() {
    return (
        <>
            <Header/>
            <div className="container mt-5">
                <h2 className="mb-4 text-center">
                    <i className="bi bi-people me-2"></i>Mazos de la Comunidad
                </h2>
                <form className="row g-3 mb-4">
                    <div className="col-md-4">
                        <input type="text" className="form-control" placeholder="Nombre del mazo..." />
                    </div>
                    <div className="col-md-3">
                        <select className="form-select">
                            <option defaultValue>Formato</option>
                            <option>Pioneer</option>
                            <option>Modern</option>
                            <option>Standard</option>
                            <option>Commander</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <input type="text" className="form-control" placeholder="Usuario creador..." />
                    </div>
                    <div className="col-md-2 d-grid">
                        <button type="submit" className="btn btn-primary">
                            <i className="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </form>
                <div className="row g-4">
                    {/* Card 1 */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card deck-card h-100">
                            <div
                                className="deck-card-bg"
                                style={{
                                    backgroundImage:
                                        "url('https://cdn.cardsrealm.com/images/cartas/blb-bloomburrow/EN/crop-med/splash-lasher-73.jpeg?5062')",
                                }}
                            ></div>
                            <div className="deck-card-content">
                                <div>
                                    <span className="deck-title">Mishra's Toy Box (UBR Artifacts)</span>
                                    <div className="deck-commander">
                                        Commander ·{" "}
                                        <img
                                            src="https://via.placeholder.com/28x40?text=C"
                                            width="28"
                                            className="rounded shadow-sm me-1"
                                            alt="Comandante"
                                        />{" "}
                                        Nombre del Comandante
                                    </div>
                                    <div className="deck-icons mb-2">
                                        <img src="https://svgs.scryfall.io/card-symbols/ub.svg" alt="UB" />
                                        <img src="https://svgs.scryfall.io/card-symbols/r.svg" alt="R" />
                                    </div>
                                    <div className="deck-meta">
                                        <span>
                                            <i className="bi bi-heart-fill text-danger"></i> 9
                                        </span>
                                        <span>
                                            <i className="bi bi-eye"></i> 19
                                        </span>
                                    </div>
                                </div>
                                <div className="deck-footer">
                                    <span className="deck-user">
                                        <img src="https://i.pravatar.cc/32?u=zarathos" alt="ZarathosTheEvil" />
                                        ZarathosTheEvil
                                    </span>
                                    <span>less than a minute ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card deck-card h-100">
                            <div
                                className="deck-card-bg"
                                style={{
                                    backgroundImage:
                                        "url('https://cards.scryfall.io/art_crop/front/7/7/77c8e3c7-8e7b-4e7c-8e7b-7e7c8e7b7e7c.jpg')",
                                }}
                            ></div>
                            <div className="deck-card-content">
                                <div>
                                    <span className="deck-title">kenrith the returned king – combo</span>
                                    <div className="deck-commander">
                                        Commander ·{" "}
                                        <img
                                            src="https://cards.scryfall.io/small/front/7/7/77c8e3c7-8e7b-4e7c-8e7b-7e7c8e7b7e7c.jpg"
                                            width="28"
                                            className="rounded shadow-sm me-1"
                                            alt="Kenrith"
                                        />{" "}
                                        Kenrith, the Returned King
                                    </div>
                                    <div className="deck-icons mb-2">
                                        <img src="https://svgs.scryfall.io/card-symbols/w.svg" alt="W" />
                                        <img src="https://svgs.scryfall.io/card-symbols/u.svg" alt="U" />
                                        <img src="https://svgs.scryfall.io/card-symbols/b.svg" alt="B" />
                                        <img src="https://svgs.scryfall.io/card-symbols/r.svg" alt="R" />
                                        <img src="https://svgs.scryfall.io/card-symbols/g.svg" alt="G" />
                                    </div>
                                    <div className="deck-meta">
                                        <span>
                                            <i className="bi bi-heart-fill text-danger"></i> 0
                                        </span>
                                        <span>
                                            <i className="bi bi-eye"></i> 54
                                        </span>
                                    </div>
                                </div>
                                <div className="deck-footer">
                                    <span className="deck-user">
                                        <img src="https://i.pravatar.cc/32?u=meo_02" alt="meo_02" />
                                        meo_02
                                    </span>
                                    <span>less than a minute ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="card deck-card h-100">
                            <div
                                className="deck-card-bg"
                                style={{
                                    backgroundImage:
                                        "url('https://cards.scryfall.io/art_crop/front/1/1/11c8e3c7-8e7b-4e7c-8e7b-7e7c8e7b7e7c.jpg')",
                                }}
                            ></div>
                            <div className="deck-card-content">
                                <div>
                                    <span className="deck-title">rapid fire shoe laces</span>
                                    <div className="deck-commander">
                                        Commander ·{" "}
                                        <img
                                            src="https://cards.scryfall.io/small/front/1/1/11c8e3c7-8e7b-4e7c-8e7b-7e7c8e7b7e7c.jpg"
                                            width="28"
                                            className="rounded shadow-sm me-1"
                                            alt="Commander"
                                        />{" "}
                                        Seton, Krosan Protector
                                    </div>
                                    <div className="deck-icons mb-2">
                                        <img src="https://svgs.scryfall.io/card-symbols/g.svg" alt="G" />
                                    </div>
                                    <div className="deck-meta">
                                        <span>
                                            <i className="bi bi-heart-fill text-danger"></i> 0
                                        </span>
                                        <span>
                                            <i className="bi bi-eye"></i> 26
                                        </span>
                                    </div>
                                </div>
                                <div className="deck-footer">
                                    <span className="deck-user">
                                        <img src="https://i.pravatar.cc/32?u=lotuslover2011" alt="lotuslover2011" />
                                        lotuslover2011
                                    </span>
                                    <span>less than a minute ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Puedes añadir más cards siguiendo el mismo patrón */}
                </div>
            </div>
        </>
    );
}

export default BuscarMazos;