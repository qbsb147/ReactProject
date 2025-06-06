import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UserStore from '../store/UserStore.jsx';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  user_name: yup.string().required('이름을 입력하세요'),
  user_id: yup.string().required('아이디를 입력하세요'),
  user_pwd: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다.').required('비밀번호을 입력하세요'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('user_pwd'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력하세요.'),
  user_nickname: yup.string().required('닉네임을 설정해주세요.'),
  phone: yup
    .string()
    .matches(/^01[0-9]-\d{3,4}-\d{4}$/, '전화번호가 유효하지 않습니다.')
    .required('전화번호를 입력하세요.'),
  age: yup.string().required('나이를 입력하세요'),
});

const useUserStore = UserStore;

const SingUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const idCheck = useUserStore((state) => state.idCheck);
  const insertUser = useUserStore((state) => state.insertUser);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

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
    <JoinForm
      onSubmit={handleSubmit((data) => {
        if (!selectedFile) {
          toast.error('파일을 선택해주세요!');
          return;
        }

        insertUser(data, selectedFile, navigate, toast); // ✅ 파일 전달
      })}
    >
      <Head>회원가입</Head>
      <input
        type="file"
        ref={fileInputRef}
        name="image"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(file);
          }
        }}
        style={{ display: 'none' }}
      />
      <Image src={preview || 'http://localhost:8888/default.png'} alt="미리보기" onClick={handleClick} />
      <Input type="text" placeholder="UserName" {...register('user_name')} />
      {errors.user_name && <ErrorText>{errors.user_name.message}</ErrorText>}
      <ID>
        <Input type="text" placeholder="UserId" {...register('user_id')} />
        <Check type="button" onClick={() => idCheck(getValues('user_id'))}>
          중복확인
        </Check>
      </ID>
      {errors.user_id && <ErrorText>{errors.user_id.message}</ErrorText>}
      <Input type="password" placeholder="Password" {...register('user_pwd')} />
      {errors.user_pwd && <ErrorText>{errors.user_pwd.message}</ErrorText>}
      <Input type="password" placeholder="PasswordCheck" {...register('passwordCheck')} />
      {errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}
      <Input type="text" placeholder="NickName" {...register('user_nickname')} />
      {errors.user_nickname && <ErrorText>{errors.user_nickname.message}</ErrorText>}
      <Input type="text" placeholder="Phone" {...register('phone')} />
      {errors.phone && <ErrorText>{errors.phone.message}</ErrorText>}
      <Input type="number" placeholder="Age" {...register('age')} />
      {errors.age && <ErrorText>{errors.age.message}</ErrorText>}
      <div>
        <Label>
          <input type="radio" value="M" {...register('gender')} />
          남성
        </Label>

        <Label>
          <input type="radio" value="F" {...register('gender')} />
          여성
        </Label>
      </div>

      {errors.gender && <ErrorText>{errors.gender.message}</ErrorText>}
      <Submit type="submit">JOIN</Submit>
    </JoinForm>
  );
};

export default SingUp;

const Label = styled.label`
  color: #333;
  display: flex;
`;

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

const Image = styled.img`
  margin-top: 20px;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  padding: 0, auto;
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
