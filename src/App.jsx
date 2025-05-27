import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { darkTheme, lightTheme } from './themes';
import GlobalStyle from './GlobalStyle';
import styled from 'styled-components';
import './App.css';
import Login from '../pages/Login';
import { ThemeProvider } from 'styled-components';
import SignUp from '../pages/SignUp';
import Main from '../pages/Main';
import Sidebar from '../pages/Sidebar';
import MovieDetail from '../pages/MovieDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyInfo from '../pages/MyInfo';
import UserUpdate from '../pages/userUpdate';
import NotFound from '../pages/NotFound';
import About from '../pages/About';

function App() {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = () => setIsDark(!isDark);
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router>
          <Sidebar onToggleTheme={toggleTheme} />
          <Center>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/about" element={<Main />} />
              <Route path="/movieDetail/:id" element={<MovieDetail />} />
              <Route path="/myInfo" element={<MyInfo />} />
              <Route path="/error" element={<NotFound />} />
              <Route path="/userUpdate" element={<UserUpdate />} />
              <Route path="/" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Center>
          <ToastContainer />
        </Router>
      </ThemeProvider>
    </>
  );
}

const Center = styled.div`
  margin-left: 200px;
`;

export default App;
