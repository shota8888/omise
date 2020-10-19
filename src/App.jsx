import React from 'react'
import Router from './Router'
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { theme } from './styles/theme'
import { GlobalStyle } from './styles'
import './assets/style.css'

const App = () => {
  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <main>
          <Router />
        </main>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  )
}

export default App