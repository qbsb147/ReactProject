import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: auto;
    width:100%;
    font-family: 'Pretendard', 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
    border:none;
    background: none;
    cursor: pointer;
    transition: all 0.3s;
  }

  ul, li {
  list-style: none;   
  margin: 0;          
  padding: 0;         
}
`;

export default GlobalStyle;
