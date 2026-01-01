// Fixed robot modes matching the Pybricks master script

export enum ModeId {
    MODE_1 = 0,
    MODE_2 = 1,
    MODE_3 = 2,
}

export enum ModeColor {
    GREEN = "GREEN",
    ORANGE = "ORANGE",
    MAGENTA = "MAGENTA",
}

export type ModeDefinition = {
    id: ModeId;
    color: ModeColor;
    description: string;
};

export const MODES: readonly ModeDefinition[] = [
    {
        id: ModeId.MODE_1,
        color: ModeColor.GREEN,
        description: "Drive only (with optional slow mode)",
    },
    {
        id: ModeId.MODE_2,
        color: ModeColor.ORANGE,
        description: "Drive with manual action",
    },
    {
        id: ModeId.MODE_3,
        color: ModeColor.MAGENTA,
        description: "Drive with automatic sensor action",
    },
] as const;
