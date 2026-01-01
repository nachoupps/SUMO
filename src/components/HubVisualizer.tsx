import React from "react";
import "./HubVisualizer.css";

interface HubVisualizerProps {
    modeColor: string;
    pressedButtons: string[];
}

const ports = ["A", "D", "E", "F"];

const HubVisualizer: React.FC<HubVisualizerProps> = ({ modeColor, pressedButtons }) => {
    return (
        <div className="hub-status-panel">
            <h3 className="section-title">
                <span className="icon">📡</span> Hub & Remote Status
            </h3>

            <div className="status-container">
                <div className="status-box hub-box" style={{ borderColor: modeColor }}>
                    <header>Inventor Hub</header>
                    <div className="ports-grid">
                        {ports.map((p) => (
                            <div key={p} className={`port-pill ${pressedButtons.includes(p) ? "active" : ""}`}>
                                Port {p}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="status-box remote-box">
                    <header>Remote Activity</header>
                    <div className="buttons-grid">
                        {["LEFT_PLUS", "LEFT_MINUS", "RIGHT_PLUS", "RIGHT_MINUS", "CENTER"].map((b) => (
                            <div key={b} className={`button-pill ${pressedButtons.includes(b) ? "pressed" : ""}`}>
                                {b.replace("_", " ")}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HubVisualizer;
