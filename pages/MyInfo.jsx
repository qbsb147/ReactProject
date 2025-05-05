import { useLocation, useNavigate, Link } from 'react-router-dom';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import UserStore from '../store/UserStore';

const useUserStore = UserStore;
const MyInfo = () => {
  const loginUser = useUserStore((state) => state.loginUser);
  return (
    <>
      <Wrapper>
        <Image src={loginUser.image || '/src/images/default.png'} alt="미리보기" />

        <Form>
          <Body>
            <Line>
              <Title>이름</Title>
              <Input value={loginUser.userName} readOnly />
            </Line>
            <Line>
              <Title>아이디</Title>
              <Input value={loginUser.userID} readOnly />
            </Line>
            <Line>
              <Title>닉네임</Title>
              <Input value={loginUser.nickName} readOnly />
            </Line>
            <Line>
              <Title>연락처</Title>
              <Input value={loginUser.phone} readOnly />
            </Line>
          </Body>
          <Footer>
            <Modify to="/userUpdate">수정하기</Modify>
            <Delete type="button">삭제하기</Delete>
          </Footer>
        </Form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  border-top: 3px solid red;
  background: #242734;
  width: 400px;
  height: 600px;
  position: relative;
  display: flex;
  justify-content: center;
  align-content: space-between;
  gap: 50px;
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
  height: 40px;
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
`;

const Title = styled.div`
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
  height: 250px;
  flex-direction: column;
  justify-content: flex-start;
`;

const Modify = styled(Link)`
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

export default MyInfo;
