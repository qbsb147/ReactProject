import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // 애니메이션 지속 시간 (ms)
      once: true, // 스크롤 시 한 번만 애니메이션 실행
    });
  }, []);

  return (
    <Container>
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
      <h1 data-aos="fade-up">스크롤 시 올라오는 제목</h1>
      <p data-aos="fade-left">왼쪽에서 나타나는 문장</p>
      <img data-aos="zoom-in" src="/src/images/default.png" alt="예시 이미지" />
    </Container>
  );
};

export default About;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  min-height: 100vh;
`;
