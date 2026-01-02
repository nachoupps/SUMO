import { useState, useEffect } from "react";
import HubVisualizer from "./HubVisualizer";
import ScriptExporter from "./ScriptExporter";
import type { Parameters } from "./ParameterEditor";
import "./LiveController.css";

const LiveController: React.FC = () => {
    // Estado de botones presionados
    const [pressedButtons, setPressedButtons] = useState<string[]>([]);
    const [currentMode, setCurrentMode] = useState(0);

    // Parámetros por defecto
    const [params] = useState<Parameters>({
        DRIVE_SPEED: 200,
        TURN_RATE: 150,
        ACTION_SPEED: 1000,
        ACTION_ANGLE: 90,
        AUTO_DISTANCE: 100,
    });

    // Colores por modo
    const modeColors = ["green", "orange", "magenta"];

    // Simula botón presionado
    const toggleButton = (button: string) => {
        setPressedButtons((prev) =>
            prev.includes(button) ? prev.filter((b) => b !== button) : [...prev, button]
        );
    };

    // Cambiar modo
    const nextMode = () => {
        setCurrentMode((currentMode + 1) % modeColors.length);
    };

    // Simulación de actualización automática cada 100ms
    useEffect(() => {
        const interval = setInterval(() => {
            // Aquí puedes agregar lógica de simulación automática si quieres
            // por ejemplo mover robot automáticamente en modo 3
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="live-controller">
            <header className="live-header">
                <h1 className="live-title">SUMO Configurator – Live Mode</h1>
                <div className="live-badge">Running</div>
            </header>

            <div className="live-main-view">
                <HubVisualizer modeColor={modeColors[currentMode]} pressedButtons={pressedButtons} />

                <div className="simulator-controls">
                    <h3 className="section-title">
                        <span className="icon">🎮</span> Simulate Remote Buttons
                    </h3>
                    <div className="sim-buttons-grid">
                        {["LEFT_PLUS", "LEFT_MINUS", "RIGHT_PLUS", "RIGHT_MINUS", "CENTER"].map((b) => (
                            <button
                                key={b}
                                className={`sim-btn ${pressedButtons.includes(b) ? 'active' : ''}`}
                                onClick={() => toggleButton(b)}
                            >
                                {b.replace("_", " ")}
                            </button>
                        ))}
                    </div>
                    <button className="mode-toggle-btn" onClick={nextMode}>
                        Next Mode ({modeColors[(currentMode + 1) % modeColors.length]})
                    </button>
                </div>
            </div>

            <ScriptExporter params={params} />
        </div>
    );
};

export default LiveController;
