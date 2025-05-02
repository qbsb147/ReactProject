import React from 'react'
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const Sidebar = ({ onToggleTheme }) => {
  return (
    <Container>    
        <h2>Movie Info</h2>
        <Ul class="">
            <li><ALink to="/">Home</ALink></li>
            <li><ALink to="">About</ALink></li>
            <li><ALink to="/login">Login</ALink></li>
            <li><ALink to="">Notes</ALink></li>
            <li><ALink to="">Contact</ALink></li>
        </Ul>
    </Container>
  )
}

const Container = styled.div`
    width:200px;
    height:100%;
    position:absolute;
    left:0px;
    top:0px;
    z-index: 5;
    background: ${({theme}) => theme.faint};
    overflow: hidden;
`

const Ul = styled.ul`
    width:100%;
    height:100%;
    margin-right: 100px;
`

const ALink = styled(Link)`
    font-size: 30px;

    &:before, &:after{
        display: inline-block;
        opacity: 0;
        -webkit-transition: -webkit-transform 0.3s, opacity 0.2s;
        -moz-transition: -moz-transform 0.3s, opacity 0.2s;
        transition: transform 0.3s, opacity 0.2s;
    }

    &:before{
        margin-right: 10px;
        content: '[';
        -webkit-transform: translateX(20px);
        -moz-transform: translateX(20px);
        transform: translateX(20px);
    }

    &:after{
        margin-left: 10px;
        content: ']';
        -webkit-transform: translateX(-20px);
        -moz-transform: translateX(-20px);
        transform: translateX(-20px);
    }

    &:hover:before, &:hover:after, &:focus:before, &:focus:after{
        opacity: 1;
        -webkit-transform: translateX(0px);
        -moz-transform: translateX(0px);
        transform: translateX(0px);
    }
`
  
export default Sidebar