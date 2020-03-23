
import React from 'react';
import LangContext, { LangContextType } from './lang.context'
import { HasChildren } from '../../../.types/props';
import lang, { withLanguage } from '../../dictionaries/lang';

// Provider types 
type Props = HasChildren
type State = LangContextType

export default class LangProvider extends React.Component<Props, State> {
  readonly state: State = { lang: lang.russian }

  changeLang = (newLang: string): void => this.setState({ lang: Object.values(lang).filter(ln => ln.notation === newLang).pop()! });

  getActual = <T extends withLanguage>(term: T): string => {
    const { lang: { notation } } = this.state
    const { lang: termLanguageVariables } = term
    return termLanguageVariables[notation]
  }

  render() {
    const { lang } = this.state;
    const { changeLang, getActual } = this;
    const { children } = this.props;
    return (
      <LangContext.Provider value={{ lang, changeLang, getActual }}>
        {children}
      </LangContext.Provider>
    );
  }
}
