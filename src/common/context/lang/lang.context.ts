import React from 'react';
import lang, { Lang, withLanguage } from '../../lang'

// context types
type LangContextProps = {
  changeLang?: (newLang: string) => void;
  getActual?: <T extends withLanguage>(term: T) => string;
} & LangContextType

export type LangContextType = {
  lang: Lang;
}

export default React.createContext<LangContextProps>({ lang: lang.russian })
