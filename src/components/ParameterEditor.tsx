import React, { useState } from "react";
import "./ParameterEditor.css";

export interface Parameters {
    DRIVE_SPEED: number;
    TURN_RATE: number;
    ACTION_SPEED: number;
    ACTION_ANGLE: number;
    AUTO_DISTANCE: number;
}

interface ParameterEditorProps {
    initialParams?: Parameters;
    onChange?: (params: Parameters) => void;
}

const defaultParams: Parameters = {
    DRIVE_SPEED: 200,
    TURN_RATE: 150,
    ACTION_SPEED: 1000,
    ACTION_ANGLE: 90,
    AUTO_DISTANCE: 100,
};

const ParameterEditor: React.FC<ParameterEditorProps> = ({ initialParams, onChange }) => {
    const [params, setParams] = useState<Parameters>(initialParams || defaultParams);

    const handleChange = (key: keyof Parameters, value: number) => {
        const newParams = { ...params, [key]: value };
        setParams(newParams);
        if (onChange) onChange(newParams);
    };

    const handleReset = () => {
        setParams(defaultParams);
        if (onChange) onChange(defaultParams);
    };

    // Tooltips and range configuration for each parameter
    const getParamConfig = (param: string) => {
        switch (param) {
            case "DRIVE_SPEED": return { tooltip: "Velocidad máxima de conducción", min: 0, max: 1000, step: 10 };
            case "TURN_RATE": return { tooltip: "Velocidad de giro (steering)", min: 0, max: 500, step: 5 };
            case "ACTION_SPEED": return { tooltip: "Velocidad del motor de acción", min: 0, max: 2000, step: 50 };
            case "ACTION_ANGLE": return { tooltip: "Ángulo de movimiento del motor", min: 0, max: 360, step: 5 };
            case "AUTO_DISTANCE": return { tooltip: "Distancia de detección (mm)", min: 0, max: 1000, step: 10 };
            default: return { tooltip: "", min: 0, max: 100, step: 1 };
        }
    };

    return (
        <div className="parameter-editor">
            <header className="editor-header">
                <h3 className="section-title">
                    <span className="icon">⚙️</span> SUMO Bot Parameters
                </h3>
                <button className="reset-btn" onClick={handleReset} title="Reset to default">
                    Reset
                </button>
            </header>

            <div className="params-container">
                {(Object.keys(params) as Array<keyof Parameters>).map((key) => {
                    const config = getParamConfig(key);
                    return (
                        <div key={key} className="param-row">
                            <div className="label-group">
                                <label htmlFor={key}>{key.replace("_", " ")}</label>
                                <span className="tooltip-text">{config.tooltip}</span>
                            </div>
                            <div className="input-group">
                                <input
                                    type="range"
                                    min={config.min}
                                    max={config.max}
                                    step={config.step}
                                    value={params[key]}
                                    onChange={(e) => handleChange(key, parseInt(e.target.value) || 0)}
                                    className="param-slider"
                                />
                                <div className="number-input-wrapper">
                                    <input
                                        id={key}
                                        type="number"
                                        value={params[key]}
                                        onChange={(e) => handleChange(key, parseInt(e.target.value) || 0)}
                                        className="param-number"
                                    />
                                    <span className="unit-label">
                                        {key.includes('ANGLE') ? '°' : key.includes('DISTANCE') ? 'mm' : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ParameterEditor;
