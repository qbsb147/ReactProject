import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: auto;
    overflow-y: hidden;
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
  ::-webkit-scrollbar {
      width: 8px;
      height: 7px;  
  }
  ::-webkit-scrollbar-thumb {
      background: rgba(52, 152, 219);
      border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
      background: rgba(52, 152, 219, .1); 
  }
  .swal2-popup {
    background: ${({ theme }) => theme.background};
    border: 1px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
  }
  
  .swal2-actions {
    display: flex;
    gap: 20px;
  }
`;

export default GlobalStyle;
