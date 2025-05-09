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
    getMovies();
  }, [getMovies]);

  return (
    <Container>
      {movies.map((movie, index) => (
        <FadeInCard key={movie.id} isAlignRight={index % 2 === 1}>
          <Card>
            <h1>{movie.title}</h1>
            <p>{movie.content}</p>
            <img src={movie.image || 'src/images/default.jpg'} alt="예시 이미지" width={'600px'} />
          </Card>
        </FadeInCard>
      ))}
    </Container>
  );
};

const FadeInCard = ({ children, isAlignRight }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
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
