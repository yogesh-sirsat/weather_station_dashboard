/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [require("daisyui")];

export const daisyui = {
  themes: [
    "light",
    "dark",
    "aqua",
    "synthwave",
    {
      Thunderstorm: {
        "primary": '#3a3a3a',
        "secondary": '#7d7d7d',
        "accent": '#cc0000',
        "neutral": '#444444',
        "base-100": '#f8f8f8',
        "base-200": '#e0e0e0',    
        "success": '#4caf50',     
        "error": '#f44336',       
      },
      Drizzle: {
        "primary": "#3a3a3b",
        "secondary": "#7d7d7e",
        "accent": "#3399ff",
        "neutral": "#555555",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
      Rain: {
        "primary": "#1976d2",
        "secondary": "#2962ff",
        "accent": "#0a9924",
        "neutral": "#484848",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
      Snow: {
        "primary": "#ffffff",
        "secondary": "#b0bec5",
        "accent": "#e0e0e0",
        "neutral": "#757575",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
      Clouds: {
        "primary": "#607d8b",
        "secondary": "#546e7a",
        "accent": "#ff9800",
        "neutral": "#757575",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
      Clear: {
        "primary": "#f9a825",
        "secondary": "#ffca28",
        "accent": "#0d47a1",
        "neutral": "#bdbdbd",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
      Mist: {
        "primary": "#9e9e9e",
        "secondary": "#757575",
        "accent": "#8e24aa",
        "neutral": "#bdbdbd",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
      Haze: {
        "primary": "#757575",
        "secondary": "#546e7a",
        "accent": "#ff9800",
        "neutral": "#bdbdbd",
        "base-100": "#f8f8f8",
        "base-200": "#e0e0e0",
        "success": "#4caf50",
        "error": "#f44336",
      },
    },
  ],
};

