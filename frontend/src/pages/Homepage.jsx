import React from "react";
import Header from "../components/Header";

function Homepage() {
    // Datos hardcodeados para cartas y mazos
    const featuredCards = [
        {
            img: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409741&type=card",
        },
        {
            img: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409740&type=card",
        },
        {
            img: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409739&type=card",
        },
        {
            img: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409738&type=card",
        },
        {
            img: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409737&type=card",
        },
        {
            img: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=409745&type=card",
        },
        

    ];

    const recentDecks = [
        {
            name: "Mazo Rakdos Sacrifice",
            user: "user_rakdos",
            avatar: "https://i.pravatar.cc/32?u=rakdos",
            lastModified: "10 minutos atrás",
        },
        {
            name: "Mazo Mono Green Stompy",
            user: "user_green",
            avatar: "https://i.pravatar.cc/32?u=green",
            lastModified: "20 minutos atrás",
        },
        {
            name: "Mazo Azorius Control",
            user: "user_azorius",
            avatar: "https://i.pravatar.cc/32?u=azorius",
            lastModified: "30 minutos atrás",
        },
    ];

    const popularDecks = [
        {
            name: "Mazo Izzet Phoenix",
            user: "user_izzet",
            avatar: "https://i.pravatar.cc/32?u=izzet",
            likes: 120,
            views: 350,
        },
        {
            name: "Mazo Boros Burn",
            user: "user_boros",
            avatar: "https://i.pravatar.cc/32?u=boros",
            likes: 95,
            views: 210,
        },
        {
            name: "Mazo Golgari Midrange",
            user: "user_golgari",
            avatar: "https://i.pravatar.cc/32?u=golgari",
            likes: 78,
            views: 180,
        },
    ];

    // Estilos usando variables CSS
    const borderStyle = { borderColor: "var(--battleship-gray)" };
    const titleStyle = { color: "var(--van-dyke)" };
    const cardTitleStyle = { color: "var(--dim-gray)" };
    const cardTextStyle = { color: "var(--battleship-gray)" };
    const headerBgStyle = { backgroundColor: "var(--ash-gray)", borderColor: "var(--battleship-gray)" };

    return (
        <>
            <Header />
            <div className="container mt-5">
                <div className="row">
                    {/* Cartas destacadas */}
                    <div className="col-12 col-md-7 col-lg-8">
                        <div className="border p-4 h-100" style={borderStyle}>
                            <h4 className="mb-4 text-center" style={titleStyle}>
                                Cartas destacadas de Magic
                            </h4>
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                {featuredCards.map(({img}, i) => (
                                    <div key={i} className="col">
                                        <div className="card h-100 shadow-sm" style={headerBgStyle}>
                                            <img src={img} className="card-img-top" alt="carta de magic"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Últimos mazos modificados y más populares */}
                    <div className="col-12 col-md-5 col-lg-4">
                        <div className="d-flex flex-column gap-3 h-100">
                            <div className="border p-4" style={borderStyle}>
                                <h5 className="mb-3" style={titleStyle}>
                                    Últimos mazos modificados
                                </h5>
                                <div className="row row-cols-1 g-3">
                                    {recentDecks.map(({ name, user, avatar, lastModified }, i) => (
                                        <div key={i} className="col">
                                            <div className="card p-3 shadow-sm" style={headerBgStyle}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="fw-semibold" style={cardTitleStyle}>
                                                        {name}
                                                    </span>
                                                    <small className="text-muted">{lastModified}</small>
                                                </div>
                                                <div className="mt-2 d-flex align-items-center gap-2">
                                                    <img
                                                        src={avatar}
                                                        alt={user}
                                                        className="rounded-circle"
                                                        width="32"
                                                        height="32"
                                                        style={{ border: "1px solid var(--battleship-gray)" }}
                                                    />
                                                    <span style={cardTextStyle}>{user}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border p-4" style={borderStyle}>
                                <h5 className="mb-3" style={titleStyle}>
                                    Mazos más populares
                                </h5>
                                <div className="row row-cols-1 g-3">
                                    {popularDecks.map(({ name, user, avatar, likes, views }, i) => (
                                        <div key={i} className="col">
                                            <div className="card p-3 shadow-sm" style={headerBgStyle}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="fw-semibold" style={cardTitleStyle}>
                                                        {name}
                                                    </span>
                                                    <div style={{ color: "var(--dim-gray)" }}>
                                                        <i className="bi bi-heart-fill text-danger me-2"></i>
                                                        {likes} <i className="bi bi-eye ms-3 me-2"></i>
                                                        {views}
                                                    </div>
                                                </div>
                                                <div className="mt-2 d-flex align-items-center gap-2">
                                                    <img
                                                        src={avatar}
                                                        alt={user}
                                                        className="rounded-circle"
                                                        width="32"
                                                        height="32"
                                                        style={{ border: "1px solid var(--battleship-gray)" }}
                                                    />
                                                    <span style={cardTextStyle}>{user}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;
