import React from 'react'
import Router from './Router'
import { ThemeProvider as MaterialThemeProvider } from "@material-ui/styles"
import { ThemeProvider as StyledThemeProvider, } from "styled-components"
import { SMain } from './styles'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles'
import './assets/style.css'
import { Header } from './components/Header'

const App = () => {
  return (
    <MaterialThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <SMain>
          <Router />
        </SMain>
      </StyledThemeProvider>
    </MaterialThemeProvider>
  )
}

export default App