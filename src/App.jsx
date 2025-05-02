import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { darkTheme, lightTheme } from './themes';
import GlobalStyle from './GlobalStyle';
import './App.css'
import Login from '../pages/Login'
import { ThemeProvider } from 'styled-components'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);
  const [count, setCount] = useState(0)
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path='/login' element={<Login onToggleTheme={toggleTheme}/>} />
          <Route path='/signUp' element={<SignUp onToggleTheme={toggleTheme}/>} />
          <Route path='/' element={<Main onToggleTheme={toggleTheme}/>} />
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
