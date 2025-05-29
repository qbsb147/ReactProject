import React, { useState, useEffect } from 'react';
import { ShineButton } from '../src/components/styled/Button';
import styled from 'styled-components';
import MovieCard from './MovieCard';
import useMovieStore from '../store/MovieStore';
import { RingLoader } from 'react-spinners';

const Main = () => {
  const movies = useMovieStore((state) => state.movies);
  const error = useMovieStore((state) => state.error);
  const loading = useMovieStore((state) => state.loading);
  const getMovies = useMovieStore((state) => state.getMovies);

  const [selectedGenre, setSelectedGenre] = useState('로맨스');

  useEffect(() => {
    getMovies(0, selectedGenre);
  }, [getMovies]);

  return (
    <Container>
      <GenreList>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('액션')}>
          액션
        </ShineButton>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('로맨스')}>
          로맨스
        </ShineButton>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('코미디')}>
          코미디
        </ShineButton>
        <ShineButton style={{ width: '100%' }} onClick={() => setSelectedGenre('다큐')}>
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
            .filter((movie) => movie.genres && movie.genres.some((genre) => genre === selectedGenre))
            .map((movie) => (
              <MovieList key={movie.movie_no}>
                <MovieCard movie={movie} onClick={() => navigator(`/detail/${movie.movie_no}`)} />
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
