import React from "react";

interface Mode {
    name: string;
    color: string;
}

interface Props {
    modes: Mode[];
    mode: number;
    setMode: (newMode: number) => void;
}

export default function ModeSelector({ modes, mode, setMode }: Props) {
    return (
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            {modes.map((m, i) => (
                <button
                    key={i}
                    style={{
                        backgroundColor: m.color,
                        color: "white",
                        padding: "10px 20px",
                        border: mode === i ? "3px solid black" : "none",
                        cursor: "pointer",
                    }}
                    onClick={() => setMode(i)}
                >
                    {m.name}
                </button>
            ))}
        </div>
    );
}
