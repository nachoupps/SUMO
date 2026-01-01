import React from 'react';
import './ModeLogicPanel.css';

interface Mode {
    name: string;
    color: string;
}

interface Props {
    mode: Mode;
    index: number;
}

export default function ModeLogicPanel({ mode, index }: Props) {
    return (
        <div className="mode-logic-panel" style={{ borderTopColor: mode.color }}>
            <header className="panel-header">
                <div className="mode-badge" style={{ backgroundColor: mode.color }}>
                    MODO {index + 1}
                </div>
                <h2 className="mode-title">{mode.name.toUpperCase()}</h2>
            </header>

            {/* SECCIÓN MOVIMIENTO - IGUAL PARA TODOS */}
            <section className="logic-section">
                <h3 className="section-title">
                    <span className="icon">↑↓</span> Movimiento
                </h3>
                <div className="logic-block gray">
                    <div className="mapping-item"><span>Avanzar:</span> <b>LEFT +</b></div>
                    <div className="mapping-item"><span>Retroceder:</span> <b>LEFT –</b></div>
                    <div className="mapping-item"><span>Girar izquierda:</span> <b>RIGHT –</b></div>
                    <div className="mapping-item"><span>Girar derecha:</span> <b>RIGHT +</b></div>
                </div>
            </section>

            {/* SECCIÓN ESPECIAL / ACCIÓN SEGÚN MODO */}
            {index === 1 && (
                <section className="logic-section">
                    <h3 className="section-title">
                        <span className="icon">🔨</span> Acción
                    </h3>
                    <div className="logic-block red">
                        <p><b>Botón RIGHT (central):</b> golpe con motor de acción</p>
                    </div>
                </section>
            )}

            {index === 2 && (
                <section className="logic-section">
                    <h3 className="section-title">
                        <span className="icon">🤖</span> Acción automática
                    </h3>
                    <div className="logic-block blue">
                        <p>Si el sensor detecta un objeto cerca:</p>
                        <p className="indent"><b>Ejecuta acción del motor</b></p>
                    </div>
                </section>
            )}
        </div>
    );
}
