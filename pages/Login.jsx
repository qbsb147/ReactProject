import React from 'react'
import styled, { keyframes } from 'styled-components';
import SignUp from './SignUp'
import { Link } from 'react-router-dom'

const Login = ({ onToggleTheme }) => {
  return (
    <Container>
      <Head>
        <AnimateLeft />
        <h2>Sign In</h2>
        <AnimateRight />
      </Head>
      <LoginForm>
          <Input type="text" placeholder="UserID"/>
          <Input type="password" placeholder="Password"/>
          <Nav>
            <Button type="submit">Login</Button>
            <StyledLink to="/signUp">Sign Up</StyledLink>
          </Nav>
      </LoginForm>
    </Container>
  );
};

export default Login;

const Nav = styled.div`
  display:flex;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  display: flex;
  color: #333;
  font-size: 17px;
  font-weight: 600;
  justify-content: center;
  align-items:center;
`

const beepbeep = keyframes`
  0% {
    width: 0px;
    opacity: 0;
    right: -10%;
    filter: hue-rotate(0deg);
  }
  25% {
    opacity: 1;
  }
  50% {
    width: 90px;
  }
  100% {
    width: 0px;
    right: 50%;
    filter: hue-rotate(600deg);
  }
`;
const beepbeepReverse = keyframes`
  0% {
    width: 0px;
    opacity: 0;
    left: -10%;
    filter: hue-rotate(0deg);
  }
  25% {
    opacity: 1;
  }
  50% {
    width: 90px;
  }
  100% {
    width: 0px;
    left: 50%;
    filter: hue-rotate(600deg);
  }
`;

const Container = styled.div`
  position: relative;
`

const Head = styled.div`
  top: -200px;
  left:0px;
  width: 400px;
  padding: 1em;
  position: relative;
`
const AnimateLeft = styled.div`
  background: yellow;
  width: 50px;
  height: 5px;
  position: absolute;
  left: -200px;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: ${beepbeep} 3s ease-in infinite;
  border: 1px dotted #524f56; /* $base-color */

  &::before {
    content: '';
    width: 50px;
    height: 3px;
    background: #ff0000;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0;
    filter: blur(5px);
  }
`;

const AnimateRight = styled.div`
  transform: scaleX(-1);
  background: yellow;
  width: 50px;
  height: 5px;
  position: absolute;
  right: -200px;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: ${beepbeepReverse} 3s ease-in infinite;
  border: 1px dotted #524f56; /* $base-color */

  &::before {
    content: '';
    width: 50%;
    height: 3px;
    background: #ff0000;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 0;
    filter: blur(5px);
  }
`;


const rotateWaves = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`


const LoginForm = styled.div`
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  transition: transform 300ms, box-shadow 300ms;
  box-shadow: 5px 10px 10px rgba(2, 128, 144, 0.2);

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-top-left-radius: 40%;
    border-top-right-radius: 45%;
    border-bottom-left-radius: 35%;
    border-bottom-right-radius: 40%;
    z-index: -1;
  }

  &::before {
    left: 40%;
    bottom: -130%;
    background-color: rgba(0, 0, 0, 0.15);
    animation: ${rotateWaves} 6s infinite linear;
  }

  &::after {
    left: 35%;
    bottom: -125%;
    background-color: rgba(0, 0, 0, 0.2);
    animation: ${rotateWaves} 7s infinite linear;
  }
`

const Input = styled.input`
    font-family: var(--font-asap);
    display: block;
    border-radius: 5px;
    font-size: 16px;
    background: white;
    width: 100%;
    border: 1px solid #eee;
    padding: 10px 10px;
    margin: 15px -10px;
`

const Button = styled.div`
    font-family: var(--font-asap);
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    text-transform: uppercase;
    width: 80px;
    border: 0;
    padding: 10px 0;
    margin-top: 10px;
    margin-left: -5px;
    border-radius: 5px;
    background-color: rgb(8, 189, 212);
    transition: background-color 300ms;
    
    &:hover {
      background-color: rgb(8, 205, 212);
    }
`
