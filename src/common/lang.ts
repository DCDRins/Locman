
interface LangDictionary {
  [id: string]: Lang;
}

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
