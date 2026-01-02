interface Props {
    modeColor: string;
}

const buttons = [
    "CENTER",
    "LEFT", "LEFT_PLUS", "LEFT_MINUS",
    "RIGHT", "RIGHT_PLUS", "RIGHT_MINUS",
    "BLUETOOTH"
];

export default function RemoteVisualizer({ modeColor }: Props) {
    return (
        <div style={{ marginTop: "30px" }}>
            <h2>Control Remoto</h2>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 80px)",
                    gap: "10px",
                    padding: "20px",
                    border: `3px solid ${modeColor}`,
                    borderRadius: "10px",
                    maxWidth: "300px",
                }}
            >
                {buttons.map((btn) => (
                    <div
                        key={btn}
                        style={{
                            width: "80px",
                            height: "50px",
                            backgroundColor: "#eee",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            userSelect: "none",
                        }}
                    >
                        {btn}
                    </div>
                ))}
            </div>
        </div>
    );
}
