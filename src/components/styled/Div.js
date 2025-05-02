import styled, { keyframes } from "styled-components";

export const Shine = styled.div`
    position: relative;
    &::before {
        position: absolute;
        top: 0;
        left: -75%;
        z-index: 2;
        display: block;
        content: '';
        width: 50%;
        height: 100%;
        background: ${({theme}) => theme.backgroundLinear};
        background: ${({theme}) => theme.backgroundLinear2};
        -webkit-transform: skewX(-25deg);
        transform: skewX(-25deg);
    }
    &:hover::before {
        -webkit-animation: shine 1.75s;
        animation: shine 1.75s;
    }
    @-webkit-keyframes shine {
        100% {
            left: 125%;
        }
    }
    @keyframes shine {
        100% {
            left: 125%;
        }
    }
`

export const Card = styled.div`
    
`