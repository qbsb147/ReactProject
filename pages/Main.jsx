import React, { useState, useEffect } from 'react';
import { ShineButton } from '../src/components/styled/Button';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import useMovieStore from '../store/MovieStore';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';

const Main = () => {
  const { movies, error, loading, getMovies } = useMovieStore();
  const [selectedGenre, setSelectedGenre] = useState('romance');

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <Container>
      <GenreList>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('action')}>
          액션
        </ShineButton>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('romance')}>
          로맨스
        </ShineButton>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('comedy')}>
          코미디
        </ShineButton>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('documentary')}>
          다큐
        </ShineButton>
      </GenreList>

      <Content>
        {loading && movies.length === 0 ? (
          <LoadingBox>
            <RingLoader color="#3498db" size={300} />
          </LoadingBox>
        ) : !error ? (
          movies
            .filter((movie) => movie.genre === selectedGenre)
            .map((movie) => (
              <MovieList key={movie.id}>
                <MovieCard movie={movie} onClick={() => navigator(`/detail/${movie.id}`)} />
              </MovieList>
            ))
        ) : (
          '에러발생'
        )}
      </Content>
    </Container>
  );
};

const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MovieList = styled.li`
  width: 100%;
  height: 200px;
  color: ${({ theme }) => theme.text};
  border: ${({ theme }) => theme.border};
`;

const Container = styled.div`
  min-width: 600px;
  width: 800px;
  overflow-x: auto;
`;

const GenreList = styled.div`
  min-width: 100%;
  overflow-x: auto;
  height: 60px;
  gap: 20px;
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  position: relative;
  height: 500px;
  display: block;
  overflow: hidden;
  color: #00c7ec;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 0 transparent;
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  margin-top: 50px;
  overflow-y: auto;
`;

export default Main;
