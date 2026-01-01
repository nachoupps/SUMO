function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>SUMO Bot Configurator</h1>

      {/* VISUALIZERS */}
      <div style={{ display: "flex", gap: 32, marginBottom: 32 }}>
        {/* HUB */}
        <div style={{ border: "2px solid #444", padding: 16, width: 200 }}>
          <h3>SPIKE Hub</h3>
          <ul>
            <li>Port A – Ultrasonic</li>
            <li>Port D – Action Motor</li>
            <li>Port E – Right Motor</li>
            <li>Port F – Left Motor</li>
          </ul>
        </div>

        {/* REMOTE */}
        <div style={{ border: "2px solid #444", padding: 16, width: 200 }}>
          <h3>Remote</h3>
          <p>LEFT + / LEFT –</p>
          <p>RIGHT + / RIGHT –</p>
          <p>CENTER</p>
        </div>
      </div>

      {/* MODES */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ border: "2px solid green", padding: 16, width: 220 }}>
          <h2 style={{ color: "green" }}>Mode 1</h2>
          <p>Driving control</p>
        </div>

        <div style={{ border: "2px solid orange", padding: 16, width: 220 }}>
          <h2 style={{ color: "orange" }}>Mode 2</h2>
          <p>Manual action</p>
        </div>

        <div style={{ border: "2px solid magenta", padding: 16, width: 220 }}>
          <h2 style={{ color: "magenta" }}>Mode 3</h2>
          <p>Automatic action</p>
        </div>
      </div>
    </div>
  );
}

export default App;
