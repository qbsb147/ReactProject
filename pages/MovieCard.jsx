import React, { useState } from 'react';
import { ShineDiv } from '../src/components/styled/Div';
import { LoadingOverlay } from '../src/components/styled/Overlay';
import { CrackleButton } from '../src/components/styled/Button';
import styled from 'styled-components';
import UserStore from '../store/UserStore.jsx';
import useMovieStore from '../store/MovieStore';

const useUserStore = UserStore;

const MovieCard = ({ movie }) => {
  const loginUser = useUserStore((state) => state.loginUser);
  const handleDelete = useMovieStore((state) => state.handleDelete);
  const deleteMovieId = useMovieStore((state) => state.deleteMovieId);

  return (
    <ShineDiv style={{ width: '100%', height: '100%', display: 'flex' }}>
      <img
        style={{ height: '100%', width: '200px' }}
        src={movie.change_name ? `http://localhost:8888/${movie.change_name}` : 'http://localhost:8888/default.jpg'}
      />
      <table>
        <Tbody>
          <Tr>
            <Td>제목</Td>
            <Td2>{movie.movie_title}</Td2>
          </Tr>
          <Tr>
            <Td>내용</Td>
            <Td2>{movie.movie_content}</Td2>
          </Tr>
          <Tr>
            <Td>평점</Td>
            <Td2>{movie.movie_grade}</Td2>
          </Tr>
          <Tr>
            <Td>감독</Td>
            <Td2>{movie.director}</Td2>
          </Tr>
        </Tbody>
      </table>
      {loginUser && loginUser.user_no === movie.writer_no && (
        <Access>
          <CrackleButton style={{ fontSize: '20px' }} data-hover="수정">
            수정
          </CrackleButton>
          <CrackleButton style={{ fontSize: '20px' }} data-hover="삭제" onClick={() => handleDelete(movie.movie_no)}>
            삭제
          </CrackleButton>
        </Access>
      )}
      {deleteMovieId === movie.movie_no && (
        <LoadingOverlay>
          <div>삭제중...</div>
        </LoadingOverlay>
      )}
    </ShineDiv>
  );
};

const Tr = styled.tr`
  width: 100%;
  text-align: start;
`;

const Td = styled.td`
  text-align: center;
  width: 100px;
`;

const Td2 = styled.td`
  width: calc(100% - 100px);
  text-align: start;
`;

const Tbody = styled.tbody`
  font-size: 20px;
  width: 100%;
  margin-left: 20px;
`;
const Access = styled.div`
  width: 181px;
  height: 50px;
  display: flex;
  justify-content: end;
  margin-top: auto;
  margin-left: auto;
`;

export default MovieCard;
