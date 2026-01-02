import "./HubViewReal.css";

interface Props {
    modeColor: string;
    onCenterClick?: () => void;
}

export default function HubViewReal({ modeColor, onCenterClick }: Props) {
    // Demo matrix indices (some active to match image feel)
    const activeCells = [0, 2, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 17, 18, 20, 22, 24];

    return (
        <div className="hub-real-body">
            {/* Corner Holes */}
            <div className="hub-hole tl"><div className="hub-hole-inner"></div></div>
            <div className="hub-hole tr"><div className="hub-hole-inner"></div></div>
            <div className="hub-hole bl"><div className="hub-hole-inner"></div></div>
            <div className="hub-hole br"><div className="hub-hole-inner"></div></div>

            {/* Top Strip (Logo + BT) */}
            <div className="hub-top-row">
                <div className="hub-brand">LEGO</div>
                <button className="hub-bt-button">
                    <span className="bt-icon">ᛒ</span>
                </button>
            </div>

            {/* Matrix Area */}
            <div className="hub-main-area">
                <div className="hub-sidebar">
                    <span>A</span>
                    <span>C</span>
                    <span>E</span>
                </div>

                <div className="hub-led-matrix">
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className={`hub-led-cell ${activeCells.includes(i) ? "active" : ""}`}
                        />
                    ))}
                </div>

                <div className="hub-sidebar">
                    <span>B</span>
                    <span>D</span>
                    <span>F</span>
                </div>
            </div>

            {/* Navigation and Main Button */}
            <div className="hub-bottom-controls">
                <div className="nav-bar-bg"></div>
                <button className="nav-btn">
                    <span className="arrow">◁</span>
                </button>

                <div className="center-btn-wrapper">
                    <button
                        className="hub-main-btn"
                        style={{ '--led-color': modeColor || '#fff' } as React.CSSProperties}
                        onClick={onCenterClick}
                    >
                        <div className="hub-main-btn-inner"></div>
                    </button>
                </div>

                <button className="nav-btn">
                    <span className="arrow">▷</span>
                </button>
            </div>
        </div>
    );
}
