// Cian del acento, reactivo al tema vía la variable CSS --accent-cyan (definida
// en global.css). Se usa en el SVG donde no llegan las utilidades de Tailwind.
export const CYAN = "rgb(var(--accent-cyan))";
export const cyanA = (a: number) => `rgb(var(--accent-cyan) / ${a})`;