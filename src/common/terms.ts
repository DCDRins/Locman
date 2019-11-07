import { withLanguage } from './lang'

export interface TermDictionary {
  [path: string]: withLanguage;
}

const terms: TermDictionary = {
  STOCK_SEARCH: {
    lang: {
      ru: 'Поиск',
      en: 'Search',
    }
  },
}

export default terms
