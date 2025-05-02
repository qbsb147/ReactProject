import React,{useState, useEffect} from 'react'
import { ShineButton} from '../src/components/styled/Button'
import { Shine} from '../src/components/styled/Div'
import styled from 'styled-components'
import axios from 'axios';

const Main = () => {
  const [selectedGenre, setSelectedGenre] = useState('romance');
  const [movies, setMovies] = useState([]);

  const getTodos = async () => {
    const res = await axios.get('http://localhost:3001/movies');
    setMovies(res.data);
  };

  useEffect(() => {
    getTodos();
  });

  return (
    <Container>
      <GenreList>
        <ShineButton style={{ width: "100%"}} onClick={()=> setSelectedGenre("action")}>액션</ShineButton>
        <ShineButton style={{ width: "100%"}} onClick={()=> setSelectedGenre("romance")}>로맨스</ShineButton>
        <ShineButton style={{ width: "100%"}} onClick={()=> setSelectedGenre("comedy")}>코미디</ShineButton>
        <ShineButton style={{ width: "100%"}} onClick={()=> setSelectedGenre("documentary")}>다큐</ShineButton>
      </GenreList>

      <Content>
        {movies
          .filter(movie => movie.genre === selectedGenre)
          .map(movie => (
            <MovieList key={movie.id} onClick={() => navigator(`/detail/${movie.id}`)}>
              <Shine style={{ width: "100%",height:"100%", display:"flex"}}>
                <img style={{height:"100%", width:"250px"}} src={movie.image || "/src/images/default.jpg"} />
                <Table>
                  <Tr>
                    <Td>
                      제목
                    </Td>
                    <Td2>
                      {movie.title}
                    </Td2>
                  </Tr>
                  <Tr>
                    <Td>
                      내용
                    </Td>
                    <Td2>
                      {movie.content}
                    </Td2>
                  </Tr>
                  <Tr>
                    <Td>
                      평점
                    </Td>
                    <Td2>
                      {movie.star}
                    </Td2>
                  </Tr>
                  <Tr>
                    <Td>
                      감독
                    </Td>
                    <Td2>
                      {movie.director}
                    </Td2>
                  </Tr>
                </Table>
              </Shine>
            </MovieList>
          ))}
      </Content>
    </Container>
  )
}
const Tr = styled.tr`
  width: 100%;
  text-align: start;
`

const Td = styled.td`
  width : 100px;
`

const Td2 = styled.td`
  width : calc(100% - 100px);
  text-align: start;
`

const Table = styled.table`
  font-size: 20px;
  width:100%;
  margin-left: 20px;
`

const MovieList = styled.li`
  width:100%;
  height: 200px;
  color: ${({theme}) => theme.text};
  border: ${({theme}) => theme.border};
`

const Container = styled.div`
  min-width:600px;
  width: 800px;
  overflow-x: auto;
`

const GenreList = styled.div`
  min-width:100%;
  overflow-x: auto;
  height:60px;
  gap: 20px;
  display:flex;
  justify-content: space-between;
`

const Content = styled.div`
    position: relative;
    height: 700px;
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
`


export default Main