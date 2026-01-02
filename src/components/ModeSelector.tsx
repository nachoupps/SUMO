import "./ModeSelector.css";

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
        <div className="mode-selector">
            {modes.map((m, i) => (
                <button
                    key={i}
                    className={`mode-btn ${m.color} ${mode === i ? "active" : ""}`}
                    onClick={() => setMode(i)}
                >
                    {m.name.toUpperCase()}
                </button>
            ))}
        </div>
    );
}
