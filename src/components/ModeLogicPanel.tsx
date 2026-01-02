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
                    {index === 0 && (
                        <div className="mapping-item special"><span>Reducir velocidad:</span> <b>Botón LEFT (30%)</b></div>
                    )}
                </div>
            </section>

            {/* SECCIÓN ESPECIAL / ACCIÓN SEGÚN MODO */}
            {index === 1 && (
                <section className="logic-section">
                    <h3 className="section-title">
                        <span className="icon">🔨</span> Acción Manual
                    </h3>
                    <div className="logic-block orange">
                        <p><b>Botón RIGHT (central derecho):</b></p>
                        <p className="indent">Golpe con martillo (ida y vuelta)</p>
                    </div>
                </section>
            )}

            {index === 2 && (
                <section className="logic-section">
                    <h3 className="section-title">
                        <span className="icon">🤖</span> Acción Automática
                    </h3>
                    <div className="logic-block magenta">
                        <p>Si objeto a menos de <b>100mm</b>:</p>
                        <p className="indent">1. Enciende luces sensor</p>
                        <p className="indent">2. Ejecuta golpe de martillo</p>
                    </div>
                </section>
            )}

        </div>
    );
}
