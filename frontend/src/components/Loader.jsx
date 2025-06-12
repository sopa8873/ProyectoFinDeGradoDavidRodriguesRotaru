import React from "react";
import "../index.css";

export default function Loader({ fullscreen = false }) {
  return (
    <div className={fullscreen ? "loader-backdrop" : ""}>
      <div className="loader-spinner"></div>
    </div>
  );
}
