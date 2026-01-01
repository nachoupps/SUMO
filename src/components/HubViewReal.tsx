import "./HubViewReal.css";

interface Props {
    modeColor: string;
    onCenterClick?: () => void;
}

export default function HubViewReal({ modeColor, onCenterClick }: Props) {
    // Demo matrix indices (some active to match image feel)
    const activeCells = [6, 7, 8, 11, 12, 13, 16, 17, 18];

    return (
        <div className="hub-real-container">
            {/* Corner Holes */}
            <div className="hub-hole tl" />
            <div className="hub-hole tr" />
            <div className="hub-hole bl" />
            <div className="hub-hole br" />

            {/* Logo and BT Section */}
            <div className="hub-top-strip">
                <div className="hub-lego-logo">LEGO</div>
                <button className="hub-bt-btn">ᛒ</button>
            </div>

            {/* Port Labels + Matrix */}
            <div className="hub-matrix-area">
                <div className="hub-matrix-labels left">
                    <div className="hub-matrix-label">A</div>
                    <div className="hub-matrix-label">C</div>
                    <div className="hub-matrix-label">E</div>
                </div>

                <div className="hub-display">
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className={`hub-cell ${activeCells.includes(i) ? "active" : ""}`}
                        />
                    ))}
                </div>

                <div className="hub-matrix-labels right">
                    <div className="hub-matrix-label">B</div>
                    <div className="hub-matrix-label">D</div>
                    <div className="hub-matrix-label">F</div>
                </div>
            </div>

            {/* Bottom Controls Row */}
            <div className="hub-controls-row">
                <button className="hub-btn small">◁</button>

                <button
                    className="hub-btn circular-led"
                    style={{ backgroundColor: modeColor || "#fff" }}
                    onClick={onCenterClick}
                />

                <button className="hub-btn small">▷</button>
            </div>
        </div>
    );
}
