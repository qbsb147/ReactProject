import axios from 'axios';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import UserStore from '../store/UserStore';

const useUserStore = UserStore;

const schema = yup.object().shape({
  userID: yup.string().required('아이디를 입력하세요'),
  password: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호를 입력해주세요.'),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    let loginUser = null;
    try {
      const user = await axios.get(`http://localhost:3001/users?userID=${data.userID}`);
      loginUser = user.data;
      if (loginUser.length === 0) {
        toast.error('로그인에 실패했습니다. 아이디를 확인해주세요.');
      }
    } catch (error) {
      toast.error(`로그인 중에 문제가 발생했습니다. ${error}`);
    }
    if (loginUser[0].password === data.password) {
      useUserStore.setState({ loginUser: loginUser[0] });
      navigate('/', {
        state: {
          toastMessage: `로그인에 성공하였습니다!`,
        },
      });
    } else {
      toast.error('로그인에 실패했습니다, 비밀번호가 다릅니다.');
    }
  };

  return (
    <Container>
      <Head>
        <AnimateLeft />
        <h2>Sign In</h2>
        <AnimateRight />
      </Head>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="UserID" {...register('userID')} />
        {errors.userID && <ErrorText>{errors.userID.message}</ErrorText>}
        <Input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
        <Nav>
          <Button type="submit">Login</Button>
          <StyledLink to="/signUp">Sign Up</StyledLink>
        </Nav>
      </LoginForm>
    </Container>
  );
};

export default Login;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  display: flex;
  color: #333;
  font-size: 17px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
`;

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
`;

const Head = styled.div`
  top: -200px;
  left: 0px;
  width: 400px;
  padding: 1em;
  position: relative;
`;
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
  border: 1px dotted ${({ theme }) => theme.base}; /* $base-color */

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
  border: 1px dotted ${({ theme }) => theme.base}; /* $base-color */

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
`;

const LoginForm = styled.form`
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  transform: translate(-50%, -50%);
  transition:
    transform 300ms,
    box-shadow 300ms;
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
`;

const Input = styled.input`
  font-family: var(--font-asap);
  display: block;
  border-radius: 5px;
  font-size: 16px;
  background: white;
  width: 100%;
  border: 1px solid #eee;
  padding: 10px 10px;
  margin: 5px -10px;
`;

const Button = styled.button`
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
`;
