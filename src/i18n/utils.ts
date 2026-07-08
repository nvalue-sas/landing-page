import { ui, defaultLang } from "./ui";

type Lang = keyof typeof ui;
type UiDict = (typeof ui)[typeof defaultLang];

export function useTranslations(lang: string | undefined) {
  const l = (lang && lang in ui ? lang : defaultLang) as Lang;
  return function t(key: keyof UiDict): string {
    return (ui[l] as UiDict)[key] ?? (ui[defaultLang] as UiDict)[key];
  };
}