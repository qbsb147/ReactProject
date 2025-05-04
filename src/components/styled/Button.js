import styled, { keyframes } from 'styled-components';

export const ShineButton = styled.button`
  color: rgba(255, 255, 255, 0.8);
  font-family: Lato;
  font-size: 17pt;
  font-weight: 400;
  padding: 15px 25px;
  position: relative;
  display: flex;
  align-items: center; // 세로 가운데 정렬
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  /**/
  overflow: hidden;
  color: #00c7ec;
  border: ${({ theme }) => theme.border};
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
`;

export const CrackleButton = styled.button`
  position: relative;
  width: 100%;
  padding: 10px 25px;
  color: ${({ theme }) => theme.text};
  border: ${({ theme }) => theme.border};

  &:hover {
    border: 1px solid ${({ theme }) => theme.contrasting00};
  }
  &:after {
    content: attr(data-hover);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 red;
    top: 0;
    color: #fff;
    background: ${({ theme }) => theme.background};
    overflow: hidden;
    padding: 10px 25px;
    clip: rect(0, 900px, 0, 0);
  }

  &:before {
    content: attr(data-hover);
    padding: 10px 25px;
    position: absolute;
    left: -2px;
    text-shadow: 1px 0 blue;
    top: 0;
    color: #fff;
    background: ${({ theme }) => theme.background};
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
  }

  &:hover:before {
    animation: noise-anim-2 3s infinite linear alternate-reverse;
  }

  &:hover:after {
    animation: noise-anim 2s infinite linear alternate-reverse;
  }

  @keyframes noise-anim {
    0% {
      clip: rect(12px, 9999px, 45px, 0);
    }
    5% {
      clip: rect(83px, 9999px, 35px, 0);
    }
    10% {
      clip: rect(32px, 9999px, 20px, 0);
    }
    15% {
      clip: rect(38px, 9999px, 37px, 0);
    }
    20% {
      clip: rect(2px, 9999px, 82px, 0);
    }
    25% {
      clip: rect(72px, 9999px, 52px, 0);
    }
    30% {
      clip: rect(42px, 9999px, 86px, 0);
    }
    35% {
      clip: rect(78px, 9999px, 17px, 0);
    }
    40% {
      clip: rect(75px, 9999px, 99px, 0);
    }
    45% {
      clip: rect(91px, 9999px, 39px, 0);
    }
    50% {
      clip: rect(83px, 9999px, 13px, 0);
    }
    55% {
      clip: rect(36px, 9999px, 88px, 0);
    }
    60% {
      clip: rect(38px, 9999px, 50px, 0);
    }
    65% {
      clip: rect(39px, 9999px, 58px, 0);
    }
    70% {
      clip: rect(15px, 9999px, 75px, 0);
    }
    75% {
      clip: rect(69px, 9999px, 45px, 0);
    }
    80% {
      clip: rect(10px, 9999px, 30px, 0);
    }
    85% {
      clip: rect(99px, 9999px, 3px, 0);
    }
    90% {
      clip: rect(3px, 9999px, 9px, 0);
    }
    95% {
      clip: rect(42px, 9999px, 67px, 0);
    }
    100% {
      clip: rect(28px, 9999px, 61px, 0);
    }
  }

  @keyframes noise-anim-2 {
    0% {
      clip: rect(55px, 9999px, 11px, 0);
    }
    5% {
      clip: rect(53px, 9999px, 93px, 0);
    }
    10% {
      clip: rect(22px, 9999px, 87px, 0);
    }
    15% {
      clip: rect(16px, 9999px, 72px, 0);
    }
    20% {
      clip: rect(16px, 9999px, 34px, 0);
    }
    25% {
      clip: rect(24px, 9999px, 48px, 0);
    }
    30% {
      clip: rect(16px, 9999px, 44px, 0);
    }
    35% {
      clip: rect(24px, 9999px, 32px, 0);
    }
    40% {
      clip: rect(54px, 9999px, 55px, 0);
    }
    45% {
      clip: rect(61px, 9999px, 61px, 0);
    }
    50% {
      clip: rect(38px, 9999px, 62px, 0);
    }
    55% {
      clip: rect(16px, 9999px, 31px, 0);
    }
    60% {
      clip: rect(63px, 9999px, 86px, 0);
    }
    65% {
      clip: rect(91px, 9999px, 27px, 0);
    }
    70% {
      clip: rect(6px, 9999px, 1px, 0);
    }
    75% {
      clip: rect(13px, 9999px, 52px, 0);
    }
    80% {
      clip: rect(3px, 9999px, 81px, 0);
    }
    85% {
      clip: rect(62px, 9999px, 96px, 0);
    }
    90% {
      clip: rect(1px, 9999px, 26px, 0);
    }
    95% {
      clip: rect(41px, 9999px, 83px, 0);
    }
    100% {
      clip: rect(6px, 9999px, 9px, 0);
    }
  }
`;
