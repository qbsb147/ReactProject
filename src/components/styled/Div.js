import styled, { keyframes } from 'styled-components';

export const ShineDiv = styled.div`
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
    background: -webkit-linear-gradient(
      left,
      ${({ theme }) => theme.contrasting00} 0%,
      ${({ theme }) => theme.contrasting03} 100%
    );
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.contrasting00} 0%,
      ${({ theme }) => theme.contrasting03} 100%
    );
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
`;
