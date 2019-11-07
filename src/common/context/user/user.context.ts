import React from 'react';
import { Role } from '../../roles'

// context types 
type UserContextProps = {
  auth: () => void; // must be userData interface
} & UserContextType

export interface UserContextType {
  authenticated: boolean;
  lang?: string;
  role?: Role;
}

export default React.createContext<Partial<UserContextProps>>({})
