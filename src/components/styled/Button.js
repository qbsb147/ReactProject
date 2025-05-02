import styled, { keyframes } from "styled-components";

export const ShineButton = styled.button`
    color: rgba(255, 255, 255, 0.8);
    font-family: Lato;
    font-size: 17pt;
    font-weight: 400;
    padding: 15px 25px;
    position: relative;
    display: flex;
    align-items: center;     // 세로 가운데 정렬
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    /**/
    overflow: hidden;
    color: #00c7ec;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 0 transparent;
    -webkit-transition: all 0.2s ease-in;
    -moz-transition: all 0.2s ease-in;
    transition: all 0.2s ease-in;

    &:hover {
        color: white;
        box-shadow: 0 0 30px 0 rgba(0, 199, 236, 0.5);
        background-color: #00c7ec;
        -webkit-transition: all 0.2s ease-out;
        -moz-transition: all 0.2s ease-out;
        transition: all 0.2s ease-out;
    }

    &:hover:before {
        -webkit-animation: shine-90 0.5s 0s linear;
        -moz-animation: shine-90 0.5s 0s linear;
        animation: shine-90 0.5s 0s linear;
    }

    &:active {
        box-shadow: 0 0 0 0 transparent;
        -webkit-transition: box-shadow 0.2s ease-in;
        -moz-transition: box-shadow 0.2s ease-in;
        transition: box-shadow 0.2s ease-in;
    }

    &:before {
        content: '';
        display: block;
        width: 0px;
        height: 86%;
        position: absolute;
        top: 7%;
        left: 0%;
        opacity: 0;
        background: white;
        box-shadow: 0 0 15px 3px white;
        -webkit-transform: skewX(-20deg);
        -moz-transform: skewX(-20deg);
        -ms-transform: skewX(-20deg);
        -o-transform: skewX(-20deg);
        transform: skewX(-20deg);
    }

    @-webkit-keyframes shine-90 {
    from {
        opacity: 0;
        left: 0%;
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
        left: 100%;
    }
    }

    @-moz-keyframes shine-90 {
    from {
        opacity: 0;
        left: 0%;
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
        left: 100%;
    }
    }

    @keyframes shine-90 {
    from {
        opacity: 0;
        left: 0%;
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
        left: 100%;
    }
}
`

export const Card = styled.div`
    
`