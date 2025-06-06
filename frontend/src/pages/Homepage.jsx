import React from "react";
import Header from "../components/Header";

function Homepage() {
    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    {/* Primer div: Cartas destacadas de Magic */}
                    <div className="col-12 col-md-7 col-lg-8">
                        <div className="border p-4 h-100">
                            <h4 className="mb-4 text-center">Cartas destacadas de Magic</h4>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                <div className="col">
                                    <div className="card h-100">
                                        <img
                                            src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card"
                                            className="card-img-top"
                                            alt="Carta 1"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Liliana, the Last Hope</h5>
                                            <p className="card-text">
                                                Planeswalker poderosa para control y midrange.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100">
                                        <img
                                            src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card"
                                            className="card-img-top"
                                            alt="Carta 2"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Chandra, Torch of Defiance</h5>
                                            <p className="card-text">
                                                Planeswalker versátil para mazos rojos.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card h-100">
                                        <img
                                            src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card"
                                            className="card-img-top"
                                            alt="Carta 3"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Teferi, Hero of Dominaria</h5>
                                            <p className="card-text">
                                                Controla la partida y roba cartas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Segundo div: Últimos mazos modificados y Mazos más populares */}
                    <div className="col-12 col-md-5 col-lg-4">
                        <div className="d-flex flex-column gap-3 h-100">
                            <div className="border p-4">
                                <h5 className="mb-3">Últimos mazos modificados</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Mazo Rakdos Sacrifice</li>
                                    <li className="list-group-item">Mazo Mono Green Stompy</li>
                                    <li className="list-group-item">Mazo Azorius Control</li>
                                </ul>
                            </div>
                            <div className="border p-4">
                                <h5 className="mb-3">Mazos más populares</h5>
                                <ul className="list-group">
                                    <li className="list-group-item">Mazo Izzet Phoenix</li>
                                    <li className="list-group-item">Mazo Boros Burn</li>
                                    <li className="list-group-item">Mazo Golgari Midrange</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;