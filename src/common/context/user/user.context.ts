import React from 'react';
import { Credentials } from '../../../models';

// context types 
type UserContextProps = {
  auth: () => void; // must be userData interface
} & UserContextType

export interface UserContextType {
  authenticated: boolean;
  lang?: string;
  role?: Credentials;
}

export default React.createContext<Partial<UserContextProps>>({})
