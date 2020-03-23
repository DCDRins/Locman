import { Dictionary } from "../../.types/types";

interface LangDictionary extends Dictionary<Lang> { }

export interface Lang {
  notation: string;
  name: string;
}

export interface withLanguage {
  lang: {
    ru: string;
    en: string;
  }
}

const lang: LangDictionary = {
  russian: {
    notation: 'ru',
    name: 'Русский'
  },
  english: {
    notation: 'en',
    name: 'English',
  },
}

export default lang;
