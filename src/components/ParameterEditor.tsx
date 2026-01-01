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

    // Tooltips for each parameter
    const getTooltip = (param: string) => {
        switch (param) {
            case "DRIVE_SPEED": return "Velocidad máxima de conducción";
            case "TURN_RATE": return "Velocidad de giro (steering)";
            case "ACTION_SPEED": return "Velocidad del motor de acción (martillo/pala)";
            case "ACTION_ANGLE": return "Ángulo de movimiento del motor de acción";
            case "AUTO_DISTANCE": return "Distancia mínima para activar acción automática";
            default: return "";
        }
    };

    return (
        <div className="parameter-editor">
            <h3 className="section-title">
                <span className="icon">⚙️</span> SUMO Bot Parameters
            </h3>

            <div className="params-container">
                {(Object.keys(params) as Array<keyof Parameters>).map((key) => (
                    <div key={key} className="param-row">
                        <div className="label-group">
                            <label htmlFor={key}>{key.replace("_", " ")}</label>
                            <span className="tooltip">{getTooltip(key)}</span>
                        </div>
                        <div className="input-group">
                            <input
                                id={key}
                                type="number"
                                value={params[key]}
                                onChange={(e) => handleChange(key, parseInt(e.target.value) || 0)}
                            />
                            <span className="unit-label">
                                {key.includes('ANGLE') ? '°' : key.includes('DISTANCE') ? 'mm' : ''}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ParameterEditor;
