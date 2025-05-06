import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CrackleErrorText } from '../src/components/styled/Text';

const NotFound = () => {
  return (
    <Container>
      <CrackleErrorText style={{ fontSize: '40px' }} data-hover="페이지를 찾을 수 없습니다">
        페이지를 찾을 수 없습니다
      </CrackleErrorText>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  background: url('/src/images/404-Error-Page.gif') center no-repeat;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 200px;
  right: 0;
  color: ${({ theme }) => theme.primary};
`;
