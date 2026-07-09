import type { Content, Lang } from "@/components/before-after/types";

export const CONTENT: Record<Lang, Content> = {
  es: {
    label: "antes vs. ahora",
    heading: "Mismo evento. Dos especies distintas de software.",
    pickScenario: "elige un escenario real",
    eventLabel: "evento",
    beforeLabel: "antes",
    afterLabel: "después",
    memoLabel: "reporte interno · nº",
    printed: "impreso 14:03",
    from: "de: sistema",
    to: "a: gerencia",
    stampTop: "pendiente",
    stampBottom: "decisión humana",
    signature: "firma responsable",
    topology: "topología de decisión",
    proposedAction: "acción propuesta",
    aiLabel: "IA",
    svgEvent: "evento",
    svgDecision: "decisión",
    steps: [
      ["lee", "el software entiende el evento, no solo lo grafica."],
      ["razona", "correlaciona señales del negocio y del contexto."],
      ["propone", "una acción con impacto estimado y confianza."],
    ],
    closingPre: "Software",
    closingPost: "IA. Esa multiplicación es la diferencia.",
    scenes: [
      {
        id: "pagos",
        event: "412 pagos rechazados en la última hora, mismo emisor.",
        antes: {
          title: "Reporte de transacciones",
          rows: [
            { k: "pagos rechazados", v: "412", tone: "danger" },
            { k: "monto en riesgo", v: "$38.4 M", tone: "warn" },
            { k: "causa", v: "sin determinar" },
            { k: "acción sugerida", v: "ninguna" },
          ],
          footer: "Ver anexo. Requiere análisis del equipo de operaciones.",
        },
        ahora: {
          reasoning: [
            "mismo emisor en el 94% de los rechazos",
            "patrón: caída temporal del banco",
            "ruta de pago alterna disponible",
          ],
          recommendation:
            "Reintentar los 412 pagos por la ruta alterna en 8 minutos.",
          impact: { label: "recuperado est.", value: "$38.4 M" },
          confidence: 92,
          actions: ["reintentar ahora", "programar"],
        },
      },
      {
        id: "facturas",
        event: "1.284 facturas de proveedores recibidas hoy.",
        antes: {
          title: "Bandeja de facturación",
          rows: [
            { k: "facturas recibidas", v: "1.284" },
            { k: "sin validar", v: "1.284", tone: "warn" },
            { k: "tiempo estimado", v: "~46 h", tone: "warn" },
            { k: "responsable", v: "manual" },
          ],
          footer: "Distribuir entre el equipo contable para revisión.",
        },
        ahora: {
          reasoning: [
            "1.201 coinciden con su orden de compra",
            "83 con diferencias de monto",
            "0 facturas duplicadas detectadas",
          ],
          recommendation:
            "Aprobar 1.201 automáticamente y escalar 83 a revisión.",
          impact: { label: "horas ahorradas", value: "46 h" },
          confidence: 97,
          actions: ["aprobar lote", "ver excepciones"],
        },
      },
      {
        id: "fraude",
        event: "Pico inusual de intentos de pago en el flujo transaccional.",
        antes: {
          title: "Monitor de transacciones",
          rows: [
            { k: "transacciones/min", v: "+320%", tone: "danger" },
            { k: "alertas", v: "17", tone: "danger" },
            { k: "clasificación", v: "pendiente", tone: "warn" },
            { k: "bloqueos", v: "0" },
          ],
          footer: "Escalar a seguridad. Confirmar antes de bloquear.",
        },
        ahora: {
          reasoning: [
            "17 tarjetas con geolocalización imposible",
            "un mismo dispositivo, 17 identidades",
            "coincide con un patrón de fraude conocido",
          ],
          recommendation: "Bloquear los 17 intentos y marcar el dispositivo.",
          impact: { label: "riesgo evitado", value: "$12.9 M" },
          confidence: 99,
          actions: ["bloquear ahora", "revisar"],
        },
      },
    ],
  },
  en: {
    label: "before vs. now",
    heading: "Same event. Two different species of software.",
    pickScenario: "pick a real scenario",
    eventLabel: "event",
    beforeLabel: "before",
    afterLabel: "after",
    memoLabel: "internal report · no.",
    printed: "printed 14:03",
    from: "from: system",
    to: "to: management",
    stampTop: "pending",
    stampBottom: "human decision",
    signature: "authorized signature",
    topology: "decision topology",
    proposedAction: "proposed action",
    aiLabel: "AI",
    svgEvent: "event",
    svgDecision: "decision",
    steps: [
      ["reads", "the software understands the event, not just charts it."],
      ["reasons", "it correlates business and context signals."],
      ["proposes", "an action with estimated impact and confidence."],
    ],
    closingPre: "Software",
    closingPost: "AI. That multiplication is the difference.",
    scenes: [
      {
        id: "payments",
        event: "412 payments declined in the last hour, same issuer.",
        antes: {
          title: "Transactions report",
          rows: [
            { k: "declined payments", v: "412", tone: "danger" },
            { k: "amount at risk", v: "$38.4 M", tone: "warn" },
            { k: "cause", v: "undetermined" },
            { k: "suggested action", v: "none" },
          ],
          footer: "See appendix. Requires review by the operations team.",
        },
        ahora: {
          reasoning: [
            "same issuer in 94% of the declines",
            "pattern: temporary bank outage",
            "alternate payment route available",
          ],
          recommendation:
            "Retry all 412 payments via the alternate route in 8 minutes.",
          impact: { label: "est. recovered", value: "$38.4 M" },
          confidence: 92,
          actions: ["retry now", "schedule"],
        },
      },
      {
        id: "invoices",
        event: "1,284 supplier invoices received today.",
        antes: {
          title: "Billing inbox",
          rows: [
            { k: "invoices received", v: "1,284" },
            { k: "unvalidated", v: "1,284", tone: "warn" },
            { k: "estimated time", v: "~46 h", tone: "warn" },
            { k: "owner", v: "manual" },
          ],
          footer: "Distribute among the accounting team for review.",
        },
        ahora: {
          reasoning: [
            "1,201 match their purchase order",
            "83 with amount discrepancies",
            "0 duplicate invoices detected",
          ],
          recommendation:
            "Approve 1,201 automatically and escalate 83 for review.",
          impact: { label: "hours saved", value: "46 h" },
          confidence: 97,
          actions: ["approve batch", "view exceptions"],
        },
      },
      {
        id: "fraud",
        event: "Unusual spike of payment attempts in the transaction flow.",
        antes: {
          title: "Transaction monitor",
          rows: [
            { k: "transactions/min", v: "+320%", tone: "danger" },
            { k: "alerts", v: "17", tone: "danger" },
            { k: "classification", v: "pending", tone: "warn" },
            { k: "blocks", v: "0" },
          ],
          footer: "Escalate to security. Confirm before blocking.",
        },
        ahora: {
          reasoning: [
            "17 cards with impossible geolocation",
            "a single device, 17 identities",
            "matches a known fraud pattern",
          ],
          recommendation: "Block the 17 attempts and flag the device.",
          impact: { label: "risk avoided", value: "$12.9 M" },
          confidence: 99,
          actions: ["block now", "review"],
        },
      },
    ],
  },
};