import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { darkTheme, lightTheme } from './themes';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import './App.css'
import Login from '../pages/Login'
import { ThemeProvider } from 'styled-components'
import SignUp from '../pages/SignUp'
import Main from '../pages/Main'
import Sidebar from '../pages/Sidebar'
import MovieDetail from '../pages/MovieDetail'

function App() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Router>
          <Sidebar onToggleTheme={toggleTheme}/>
          <div>
            <Routes>
              <Route path='/login' element={<Login/>} />
              <Route path='/signUp' element={<SignUp/>} />
              <Route path='/' element={<Main/>} />
              <Route path="/movieDetail/:id" element={<MovieDetail/>}/>
            </Routes>
          </div>
          <div style={{width:"200px"}}>
          </div>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
