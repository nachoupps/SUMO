import "./HubRemoteVisualizer.css";
import HubViewReal from "./HubViewReal";

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
                    <HubViewReal
                        modeColor={modeColor}
                        onCenterClick={() => handleClick("HUB_CENTER")}
                    />
                    <div className="component-label">HUB INVENTOR</div>
                </div>
            )}


            {/* REMOTE SECTION */}
            <div className="remote-module">
                <div className="remote-device">
                    {/* Left Pad */}
                    <div className="remote-pad-side">
                        <div className="remote-side-label">L</div>
                        <div className="circular-pad">
                            <button className="action-btn plus" onClick={() => handleClick("LEFT_PLUS")}>+</button>
                            <button className="action-btn stop" onClick={() => handleClick("LEFT_CENTER")}>L</button>
                            <button className="action-btn minus" onClick={() => handleClick("LEFT_MINUS")}>-</button>
                        </div>
                    </div>

                    {/* Center Section */}
                    <div className="remote-bridge">
                        <div className="remote-status-light" style={{ backgroundColor: modeColor, boxShadow: `0 0 10px ${modeColor}` }} />
                        <button className="hub-link-btn" onClick={() => handleClick("HUB_BUTTON")}></button>
                        <div className="lego-stamp">LEGO</div>
                    </div>

                    {/* Right Pad */}
                    <div className="remote-pad-side">
                        <div className="remote-side-label">R</div>
                        <div className="circular-pad rotated">
                            <button className="action-btn plus" onClick={() => handleClick("RIGHT_PLUS")}>+</button>
                            <button className="action-btn stop" onClick={() => handleClick("RIGHT_CENTER")}>R</button>
                            <button className="action-btn minus" onClick={() => handleClick("RIGHT_MINUS")}>-</button>
                        </div>
                    </div>
                </div>
                <div className="component-label">CONTROL REMOTO</div>
            </div>

        </div>
    );
};

