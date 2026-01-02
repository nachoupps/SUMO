import { useState, useCallback } from "react";
import "./App.css";

// Components
import { HubRemoteVisualizer } from "./components/HubRemoteVisualizer";
import ModeSelector from "./components/ModeSelector";
import ModeLogicPanel from "./components/ModeLogicPanel";
import ParameterEditor from "./components/ParameterEditor";
import type { Parameters } from "./components/ParameterEditor";
import ScriptExporter from "./components/ScriptExporter";

// Mode configuration
const MODES = [
  { name: "Modo 1 - Conducción", color: "green" },
  { name: "Modo 2 - Combate", color: "orange" },
  { name: "Modo 3 - Automático", color: "magenta" },
];

// Default parameters
const DEFAULT_PARAMS: Parameters = {
  DRIVE_SPEED: 200,
  TURN_RATE: 150,
  ACTION_SPEED: 1000,
  ACTION_ANGLE: 90,
  AUTO_DISTANCE: 100,
};

function App() {
  const [mode, setMode] = useState(0);
  const [params, setParams] = useState<Parameters>(DEFAULT_PARAMS);
  const [lastButton, setLastButton] = useState<string | null>(null);

  const currentModeColor = MODES[mode].color;

  const handleButtonPress = useCallback((button: string) => {
    setLastButton(button);
    console.log("Button pressed:", button);

    // Cycle modes on center button press
    if (button === "HUB_CENTER" || button === "HUB_BUTTON") {
      setMode((prev) => (prev + 1) % MODES.length);
    }
  }, []);

  const handleParamsChange = useCallback((newParams: Parameters) => {
    setParams(newParams);
  }, []);

  return (
    <div className="sumo-app">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">🤖 SUMO Bot Configurator</h1>
        <p className="app-subtitle">
          Configure your Pybricks LEGO SUMO robot
        </p>
      </header>

      {/* Mode Selector */}
      <section className="mode-selector-section">
        <ModeSelector modes={MODES} mode={mode} setMode={setMode} />
        {lastButton && (
          <div className="last-button-indicator">
            Last button: <strong>{lastButton}</strong>
          </div>
        )}
      </section>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Column: Visualizers */}
        <div className="left-column">
          <section className="visualizer-section">
            <HubRemoteVisualizer
              modeColor={currentModeColor}
              onButtonPress={handleButtonPress}
            />
          </section>
        </div>

        {/* Center Column: Mode Logic Panels */}
        <div className="center-column">
          <h2 className="column-title">🎮 Mode Logic</h2>
          <div className="mode-panels">
            {MODES.map((m, index) => (
              <ModeLogicPanel
                key={index}
                mode={m}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Parameters & Export */}
        <div className="right-column">
          <ParameterEditor
            initialParams={params}
            onChange={handleParamsChange}
          />
          <ScriptExporter
            params={params}
            currentModeColor={currentModeColor}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Active Mode:{" "}
          <span
            className="mode-indicator"
            style={{ color: currentModeColor }}
          >
            {MODES[mode].name}
          </span>
        </p>
      </footer>
    </div>
  );
}

export default App;
