import type { Content, Lang } from "@/components/trajectory/types";

export const CONTENT: Record<Lang, Content> = {
  es: {
    label: "trayectoria",
    heading: "No somos una startup aprendiendo. Somos una casa con oficio.",
    metrics: [
      ["11+", "años construyendo"],
      ["99%", "disponibilidad"],
      ["M+", "transacciones procesadas"],
    ],
    cases: [
      {
        title: "Pasarela de pago de alto tráfico",
        description:
          "Procesamos millones de transacciones al mes con reintentos inteligentes, ruteo por emisor y monitoreo en vivo. Cada segundo cuenta y cada peso también.",
      },
      {
        title: "IA que va de la imagen a la acción",
        description:
          "Nuestros sistemas leen imágenes, extraen los datos que importan y disparan procesos automáticos aguas abajo. No es un OCR: es una decisión completa.",
      },
      {
        title: "Entornos donde el error no es opción",
        description:
          "Trabajamos para sector público y privado en operaciones críticas. Diseñamos para el fallo: redundancia, trazabilidad y responsabilidad clara.",
      },
    ],
  },
  en: {
    label: "journey",
    heading:
      "We're not a startup still learning. We're a house with a craft.",
    metrics: [
      ["11+", "years building"],
      ["99%", "uptime"],
      ["M+", "transactions processed"],
    ],
    cases: [
      {
        title: "High-traffic payment gateway",
        description:
          "We process millions of transactions a month with smart retries, issuer-based routing, and live monitoring. Every second counts, and so does every peso.",
      },
      {
        title: "AI that goes from image to action",
        description:
          "Our systems read images, extract the data that matters, and trigger automated downstream processes. It's not OCR — it's a complete decision.",
      },
      {
        title: "Environments where failure isn't an option",
        description:
          "We work with public and private sector clients on critical operations. We design for failure: redundancy, traceability, and clear accountability.",
      },
    ],
  },
};