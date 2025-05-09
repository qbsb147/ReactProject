import { useLocation, useNavigate, Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import UserStore from '../store/UserStore.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  userName: yup.string().required('이름을 입력하세요'),
  userID: yup.string().required('아이디를 입력하세요'),
  password: yup.string().required('비밀번호를 입력하세요'),
  passwordCheck: yup.string().required('비밀번호 확인을 입력하세요.'),
  nickName: yup.string().required('닉네임을 설정해주세요.'),
  phone: yup
    .string()
    .matches(/^01[0-9]-\d{3,4}-\d{4}$/, '전화번호가 유효하지 않습니다.')
    .required('전화번호를 입력하세요.'),
});

const useUserStore = UserStore;
const UserUpdate = () => {
  const navigate = useNavigate();
  const loginUser = useUserStore((state) => state.loginUser);
  const { handleDelete, updateSubmit } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      userName: loginUser.userName,
      userID: loginUser.userID,
      nickName: loginUser.nickName,
      phone: loginUser.phone,
    },
  });

  return (
    <>
      <Wrapper>
        <Image src={(loginUser && loginUser.image) || '/src/images/default.png'} alt="미리보기" />
        <h1 style={{ marginTop: '20px' }}>회원정보 변경</h1>
        <Form onSubmit={handleSubmit((data) => updateSubmit(data, toast, navigate))}>
          <Body>
            <Line>
              <Title>이름</Title>
              <Input type="text" {...register('userName')} />
            </Line>
            <Line>
              <Title>아이디</Title>
              <Input type="text" {...register('userID')} />
            </Line>
            <Line>
              <Title>닉네임</Title>
              <Input type="text" {...register('nickName')} />
            </Line>
            <Line>
              <Title>연락처</Title>
              <Input type="text" {...register('phone')} />
            </Line>
            <Line>
              <Title>
                새로운
                <br /> 비밀번호
              </Title>
              <Input type="password" {...register('password')} />
            </Line>
            <Line>
              <Title>
                새로운
                <br /> 비밀번호 확인
              </Title>
              <Input type="password" {...register('passwordCheck')} />
            </Line>
          </Body>
          <Footer>
            <Modify type="submit">수정하기</Modify>
            <Delete
              type="button"
              onClick={() => {
                handleDelete(loginUser.id, navigate);
              }}
            >
              삭제하기
            </Delete>
          </Footer>
        </Form>
      </Wrapper>
    </>
  );
};

export default UserUpdate;

const Wrapper = styled.div`
  border-top: 3px solid red;
  background: #242734;
  width: 400px;
  height: 600px;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin: 20px 0px;
  color: #afb1be;
`;

const Image = styled.img`
  margin-top: 20px;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  padding: 0, auto;
`;

const Line = styled.div`
  width: 100%;
  border: 2px solid #393d52;
  box-sizing: border-box;
  background: #32364a;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  ::placeholder {
    color: #b0b0b0;
    font-size: 14px;
  }
`;

const Input = styled.input`
  height: 100%;
  width: 75%;
  background: none;
  border: none;
  border-left: 1px solid #424557;
  color: #b0b0b0;
  font-size: 20px;
  letter-spacing: 2px;
  &:focus {
    outline: none; /* 포커스 시 외곽선 제거 */
    background: #4a4c5a;
  }
`;

const Form = styled.form`
  width: 100%;
  position: relative;
  margin-bottom: 120px;
`;

const Title = styled.div`
  padding: 2px 0px;
  width: 25%;
`;

const Footer = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-around;
`;
const Body = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const Modify = styled.button`
  width: 150px;
  height: 50px;
  background: none;
  border: 3px solid #dc6180;
  border-radius: 50px;
  position: absolute;
  left: 20px;
  color: #dc6180;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #dc6180;
    background: #424557;
    border: 3px solid #c78595;
  }
`;

const Delete = styled.button`
  width: 150px;
  height: 50px;
  background: none;
  border: 3px solid #dc6180;
  border-radius: 50px;
  position: absolute;
  right: 20px;
  color: #dc6180;

  &:hover {
    background: #424557;
    border: 3px solid #c78595;
  }
`;
