import type { ui } from "@/i18n/ui";

export type Lang = keyof typeof ui;

export type Metric = [value: string, label: string];

export interface CaseItem {
  title: string;
  description: string;
}

export interface Content {
  label: string;
  heading: string;
  metrics: Metric[];
  cases: CaseItem[];
}