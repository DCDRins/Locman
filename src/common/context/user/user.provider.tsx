
import React from 'react';
import UserContext, { UserContextType } from './user.context'
import { HasChildren } from '../../types/props';

// Provider types 
type Props = HasChildren
type State = UserContextType

export default class ThemeProvider extends React.Component<Props, State> {
  readonly state: State = { authenticated: false }

  auth = (): void => {
    const { authenticated } = this.state;
    // const { role } = data;
    this.setState({ authenticated: !authenticated });
    // set own role system here
  }

  render() {
    const { authenticated, role, lang } = this.state;
    const { auth } = this;
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ authenticated, role, lang, auth }}>
        {children}
      </UserContext.Provider>
    );
  }
}
