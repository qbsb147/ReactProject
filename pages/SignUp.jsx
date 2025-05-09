import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserStore from '../store/UserStore.jsx';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  userName: yup.string().required('이름을 입력하세요'),
  userID: yup.string().required('아이디를 입력하세요'),
  password: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호을 입력하세요'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
  nickName: yup.string().required('닉네임을 설정해주세요.'),
  phone: yup
    .string()
    .matches(/^01[0-9]-\d{3,4}-\d{4}$/, '전화번호가 유효하지 않습니다.')
    .required('전화번호를 입력하세요.'),
});

const useUserStore = UserStore;

const SingUp = () => {
  const navigate = useNavigate();
  const { idCheck, insertUser } = useUserStore();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  return (
    <JoinForm onSubmit={handleSubmit((data) => insertUser(data, navigate, toast))}>
      <Head>회원가입</Head>
      <Input type="text" placeholder="UserName" {...register('userName')} />
      {errors.userName && <ErrorText>{errors.userName.message}</ErrorText>}
      <ID>
        <Input type="text" placeholder="UserId" {...register('userID')} />
        <Check type="button" onClick={() => idCheck(getValues('userID'))}>
          중복확인
        </Check>
      </ID>
      {errors.userID && <ErrorText>{errors.userID.message}</ErrorText>}
      <Input type="password" placeholder="Password" {...register('password')} />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
      <Input type="password" placeholder="PasswordCheck" {...register('passwordCheck')} />
      {errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}
      <Input type="text" placeholder="NickName" {...register('nickName')} />
      {errors.nickName && <ErrorText>{errors.nickName.message}</ErrorText>}
      <Input type="text" placeholder="Phone" {...register('phone')} />
      {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
      <Submit type="submit">JOIN</Submit>
    </JoinForm>
  );
};

export default SingUp;

const ErrorText = styled.p`
  font-size: 12px;
  color: red;
`;

const Head = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #777;
`;

const rotateWaves = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const JoinForm = styled.form`
  overflow: hidden;
  background-color: white;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  transform: translate(0, 0);
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
    left: 35%;
    bottom: -85%;
    background-color: rgba(0, 0, 0, 0.15);
    animation: ${rotateWaves} 6s infinite linear;
  }

  &::after {
    left: 30%;
    bottom: -80%;
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
  border: 1px solid #eeeeee;
  padding: 10px 10px;
  margin: 5px -10px;
`;

const ID = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  > input {
    width: calc(100% - 100px);
  }
`;

const Check = styled.button`
  font-size: 15px;
  margin: 5px 0px;
  padding: 2px;
  width: 90px;
  font-weight: 500;
  background: #eee;
  border-radius: 8px;

  &:hover {
    background: rgb(8, 189, 212);
    color: #fff;
  }
`;

const Submit = styled.button`
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
