import styled, { keyframes } from 'styled-components';

export const CrackleErrorText = styled.span`
  position: relative;
  width: 100%;
  padding: 10px 25px;
  color: #f1f1f1;
  &:after {
    content: attr(data-hover);
    position: absolute;
    left: 2px;
    text-shadow: -1px 0 red;
    top: 0;
    bottom: 0;
    right: -2px;
    color: #fff;
    background: #000;
    overflow: hidden;
    padding: 10px 25px;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim 2s infinite linear alternate-reverse;
  }

  &:before {
    content: attr(data-hover);
    padding: 10px 25px;
    position: absolute;
    left: -2px;
    bottom: 0;
    right: 2px;
    text-shadow: 1px 0 blue;
    top: 0;
    color: #fff;
    background: #000;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: noise-anim-2 3s infinite linear alternate-reverse;
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
