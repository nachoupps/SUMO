import React from "react";
import "./HubRemoteVisualizer.css";

type ModeColor = "green" | "orange" | "magenta" | string;

interface Props {
    modeColor: ModeColor;
    onButtonPress?: (button: string) => void;
    hideHub?: boolean;
}

export const HubRemoteVisualizer: React.FC<Props> = ({ modeColor, onButtonPress, hideHub }) => {
    const handleClick = (btn: string) => {
        if (onButtonPress) onButtonPress(btn);
    };

    return (
        <div className="visualizer-container">
            {/* HUB SECTION */}
            {!hideHub && (
                <div className="hub-module">
                    <div className="hub-wrapper">
                        <div className="hub-device">
                            {/* 5x5 LED Matrix at the TOP */}
                            <div className="hub-matrix">
                                {Array.from({ length: 25 }).map((_, i) => {
                                    const labels: Record<number, string> = {
                                        0: "A", 10: "C", 20: "E", // 1st Column
                                        4: "B", 14: "D", 24: "F"  // 5th Column
                                    };
                                    return (
                                        <div key={i} className={`matrix-pixel ${[6, 7, 8, 11, 12, 13, 16, 17, 18].includes(i) ? "active" : ""}`}>
                                            {labels[i]}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Status Light and Navigation at the BOTTOM */}
                            <div className="hub-controls">
                                <div className="hub-top-row">
                                    <button className="hub-nav-btn" onClick={() => handleClick("HUB_LEFT")}>{"<"}</button>
                                    <div className="hub-main-btn-container">
                                        <button
                                            className="hub-main-btn"
                                            style={{ backgroundColor: modeColor }}
                                            onClick={() => handleClick("HUB_CENTER")}
                                        />
                                    </div>
                                    <button className="hub-nav-btn" onClick={() => handleClick("HUB_RIGHT")}>{">"}</button>
                                </div>
                            </div>

                            {/* Bluetooth Button */}
                            <button className="hub-bluetooth-btn" onClick={() => handleClick("HUB_BT")}>
                                ᛒ
                            </button>

                        </div>

                        {/* Yellow side with ports (2x3 grid) */}
                        <div className="hub-side-panel">
                            <div className="hub-port" />
                            <div className="hub-port" />
                            <div className="hub-port" />
                            <div className="hub-port" />
                            <div className="hub-port" />
                            <div className="hub-port" />
                        </div>

                    </div>
                    <div className="label">Hub Inventor</div>
                </div>
            )}


            {/* REMOTE SECTION */}
            <div className="remote-module">
                <div className="remote-device">
                    {/* Left Pad (L) */}
                    <div className="remote-pad-container">
                        <div className="remote-label">L</div>
                        <div className="remote-pad">
                            <button className="pad-btn plus" onClick={() => handleClick("LEFT_PLUS")}>+</button>
                            <button className="pad-btn stop" onClick={() => handleClick("LEFT_CENTER")}>L</button>
                            <button className="pad-btn minus" onClick={() => handleClick("LEFT_MINUS")}>-</button>
                        </div>
                    </div>

                    {/* Center Column */}
                    <div className="remote-center">
                        <div className="remote-led-container">
                            <div className="remote-led" style={{ backgroundColor: modeColor, color: modeColor }} />
                        </div>
                        <button className="remote-btn-green" onClick={() => handleClick("HUB_BUTTON")}>●</button>
                        <div className="remote-logo-placeholder">LEGO</div>
                    </div>

                    {/* Right Pad (R) */}
                    <div className="remote-pad-container">
                        <div className="remote-label">R</div>
                        <div className="remote-pad rotated-90-ccw">
                            <button className="pad-btn plus" onClick={() => handleClick("RIGHT_PLUS")}>+</button>
                            <button className="pad-btn stop" onClick={() => handleClick("RIGHT_CENTER")}>R</button>
                            <button className="pad-btn minus" onClick={() => handleClick("RIGHT_MINUS")}>-</button>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
};

