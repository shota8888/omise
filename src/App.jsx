import React from 'react'
import Router from './Router'
import { GlobalStyle } from './styles/index'
import './assets/style.css'

const App = () => {
  return (
    <main>
      <GlobalStyle />
      <Router />
    </main>
  )
}

export default App