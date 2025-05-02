import React from 'react'
import styled, { keyframes } from 'styled-components';

const SingUp = () => {
  return (
    <Container>
        <JoinForm>
            <Head>회원가입</Head>
            <Alert>fasd</Alert>
            <Input type="text" placeholder="Username"/>
            <ID>
                <Input type="text" placeholder="UserId"/>
                <Check>중복확인</Check>
            </ID>
            <Input type="password" placeholder="Password"/>
            <Input type="text" placeholder="PasswordCheck"/>
            <Input type="password" placeholder="NickName"/>
            <Input type="password" placeholder="Phone"/>
            <Button type="submit">JOIN</Button>
        </JoinForm>
    </Container>
  )
}

export default SingUp;

const Alert = styled.div`
    font-size:15px;
    color:#333;
    text-align: left;
`

const Container = styled.div`
    display:flex;
    flex-direction: column;
`

const Head = styled.div`
    font-size: 40px;
    font-weight: 700;
    color:#888;
`

const rotateWaves = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`


const JoinForm = styled.div`
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  width: 400px;
  position : relative;
  transform: translate(0, 0);
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
    left: 35%;
    bottom: -95%;
    background-color: rgba(0, 0, 0, 0.15);
    animation: ${rotateWaves} 6s infinite linear;
  }

  &::after {
    left: 30%;
    bottom: -90%;
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
    border: 1px solid #eeeeee;
    padding: 10px 10px;
    margin: 15px -10px;
`

const ID = styled.div`
    display:flex;
    width : 100%;
    height: 50px;
    margin: 0px -10px;
    gap:20px;
    > input{
        width : calc(100% - 100px);
        margin: 0px;
    }
`

const Check = styled.button`
    font-size: 15px;
    padding:2px;
    width:90px;
    height: 50px;
    font-weight: 500;
    background: #eee;
    border-radius: 8px;

    &:hover{
        background: rgb(8, 189, 212);
        color: #fff;
    }
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
