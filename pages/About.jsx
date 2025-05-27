import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import useMovieStore from '../store/MovieStore';

const About = () => {
  const getMovies = useMovieStore((state) => state.getMovies);
  const movies = useMovieStore((state) => state.movies);
  const page = useMovieStore((state) => state.page);
  const hasMore = useMovieStore((state) => state.hasMore);
  const loading = useMovieStore((state) => state.loading);

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      delay: 50,
      mirror: true,
    });

    AOS.refresh();
  }, []);

  useEffect(() => {
    getMovies(0); // 첫 페이지 초기 로드
  }, [getMovies]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      getMovies(page + 1);
    }
  }, [inView, hasMore, loading, getMovies, page]);

  return (
    <Container>
      {movies.map((movie, index) => (
        <FadeInCard
          key={movie.movie_no}
          isAlignRight={index % 2 === 1}
          ref={index === movies.length - 1 ? ref : null} // 마지막 카드에만 ref 설정
        >
          <Card>
            <h1>{movie.movie_title}</h1>
            <p>{movie.movie_content}</p>
            <img
              src={
                movie.change_name ? `http://localhost:8888/${movie.change_name}` : 'http://localhost:8888/default.jpg'
              }
              alt="예시 이미지"
              width="600px"
            />
          </Card>
        </FadeInCard>
      ))}
    </Container>
  );
};

const FadeInCard = ({ children, isAlignRight, innerRef }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={innerRef || ref} // innerRef가 전달되면 그것을 사용하고, 그렇지 않으면 useInView의 ref 사용
      initial={{ opacity: 0, x: isAlignRight ? 100 : -100 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: isAlignRight ? 100 : -100 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        alignSelf: isAlignRight ? 'flex-end' : 'flex-start',
      }}
    >
      <Card>{children}</Card>
    </motion.div>
  );
};

export default About;

const Container = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  height: 800px;
  gap: 40px;
  padding: 20px;
`;

const Card = styled.div`
  width: 700px;
  padding: 20px;
`;
