// Color constants
export const colors = {
    primary: '#0859BC',
    secondary: '#FF822E',
    darkNavy: '#203252',
    lightGray: '#E2E2E2',
    background: '#f9f9f9',
    white: '#ffffff',
    textDark: '#203252',
    textGray: '#666666',
    success: '#25d366',
} as const;

// Type for color keys
export type ColorKey = keyof typeof colors;