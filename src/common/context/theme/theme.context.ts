import React from 'react';

// context types 
export type ThemeContextProps = {
  toggleMode?: () => void
} & typeof defaultThemeState

export const defaultThemeState = {
  darkMode: true
}

export default React.createContext<ThemeContextProps>(defaultThemeState)
