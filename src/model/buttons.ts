// Buttons available on the Pybricks Remote

export const RemoteButton = {
    LEFT_PLUS: "LEFT_PLUS",
    LEFT_MINUS: "LEFT_MINUS",
    RIGHT_PLUS: "RIGHT_PLUS",
    RIGHT_MINUS: "RIGHT_MINUS",
    LEFT_CENTER: "LEFT_CENTER",
    RIGHT_CENTER: "RIGHT_CENTER",
    CENTER: "CENTER",
} as const;

export type RemoteButton = (typeof RemoteButton)[keyof typeof RemoteButton];
