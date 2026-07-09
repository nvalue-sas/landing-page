import type { ui } from "@/i18n/ui";

export type Lang = keyof typeof ui;

export type Row = { k: string; v: string; tone?: "danger" | "warn" };

export interface Scene {
  id: string;
  event: string;
  antes: { title: string; rows: Row[]; footer: string };
  ahora: {
    reasoning: string[];
    recommendation: string;
    impact: { label: string; value: string };
    confidence: number;
    actions: [string, string];
  };
}

export interface Content {
  label: string;
  heading: string;
  pickScenario: string;
  eventLabel: string;
  beforeLabel: string;
  afterLabel: string;
  memoLabel: string;
  printed: string;
  from: string;
  to: string;
  stampTop: string;
  stampBottom: string;
  signature: string;
  topology: string;
  proposedAction: string;
  aiLabel: string;
  svgEvent: string;
  svgDecision: string;
  steps: [string, string][];
  closingPre: string;
  closingPost: string;
  scenes: Scene[];
}