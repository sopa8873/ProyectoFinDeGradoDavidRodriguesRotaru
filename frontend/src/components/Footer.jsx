import React from "react";

function Footer() {
    return (
        <footer style={{
            background: "var(--paynes-gray)",
            color: "var(--seasalt)",
            padding: "16px 0",
            textAlign: "center",
            marginTop: "40px"
        }}>
            <div>
                © {new Date().getFullYear()} MTG District · Proyecto Fin de Grado · David Rodrigues Rotaru
            </div>
        </footer>
    );
}

export default Footer;