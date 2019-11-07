
import React from 'react';
import { HasChildren } from '../../types/props';
import ThemeContext, { defaultThemeState } from './theme.context'

type Props = {} & HasChildren

type State = typeof defaultThemeState

export default class ThemeProvider extends React.Component<Props, State> {
  readonly state: State = defaultThemeState

  toggleMode = (): void => {
    const { darkMode } = this.state;
    this.setState({ darkMode: !darkMode });
  }

  render() {
    const { darkMode } = this.state;
    const { toggleMode } = this;
    const { children } = this.props;
    return (
      <ThemeContext.Provider value={{ darkMode, toggleMode }}>
        {children}
      </ThemeContext.Provider>
    );
  }
}
