import styled, { keyframes } from 'styled-components';

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primary};
  opacity: 0.8;

  div {
    background: ${({ theme }) => theme.primary};
    opacity: 0.8;
    font-size: 18px;
    font-weight: 700;
    border-radius: 4px;
  }
`;
