import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaMoon, FaSun } from 'react-icons/fa';

const Sidebar = ({ onToggleTheme }) => {
  const location = useLocation();
  const [login, setLogin] = useState(false);
  const loginUser = JSON.parse(sessionStorage.getItem('loginUser')) || null;
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage);
      const { toastMessage, ...restState } = location.state;
      navigate({
        state: restState,
      });
    }
  }, [location.state?.toastMessage]);

  const handleLogout = () => {
    sessionStorage.removeItem('loginUser');
  };

  return (
    <Container>
      <h2>Movie Info</h2>
      <Ul>
        <li>
          <ALink to="/">
            <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" />
            </svg>
            Home
          </ALink>
        </li>
        <li>
          <ALink to="">
            <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" />
            </svg>
            About
          </ALink>
        </li>
        <li>
          {loginUser ? (
            <ALink onClick={handleLogout}>
              <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
                <rect x="0" y="0" width="100%" height="100%" />
              </svg>
              Logout
            </ALink>
          ) : (
            <ALink to="/login">
              <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
                <rect x="0" y="0" width="100%" height="100%" />
              </svg>
              Login
            </ALink>
          )}
        </li>
        <li>
          <ALink to="">
            <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" />
            </svg>
            Notes
          </ALink>
        </li>
        <li>
          <ALink to="">
            <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" />
            </svg>
            Contact
          </ALink>
        </li>
      </Ul>
      <ToggleButton onClick={onToggleTheme}>
        <FaSun /> / <FaMoon />
        <br /> 테마 토글
      </ToggleButton>
    </Container>
  );
};

const Container = styled.div`
  width: 200px;
  min-height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 5;
  background: ${({ theme }) => theme.faint};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Ul = styled.ul`
  width: 100%;
  height: 100%;
  margin-right: 100px;
`;

const ALink = styled(Link)`
  width: 100%;
  position: relative;
  display: inline-block;
  font-size: 30px;
  padding: 10px 20px;

  svg {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  svg rect {
    fill: none;
    stroke: ${({ theme }) => theme.contrasting04};
    stroke-width: 4;
    stroke-dasharray: 422, 0;
    -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    -moz-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
    transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  }

  &:hover svg rect {
    stroke-width: 5;
    stroke: ${({ theme }) => theme.contrasting};
    stroke-dasharray: 15, 310;
    stroke-dashoffset: 48;
  }
`;

const ToggleButton = styled.button`
  width: 100%;
  margin-top: auto;
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.text};
  font-size: 27px;
  padding: 10px 20px;
  border: 0 solid;
  outline: 1px solid;
  outline-color: ${({ theme }) => theme.contrasting05};
  outline-offset: 0px;
  text-shadow: none;
  transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
  align-self: center;

  &:hover {
    width: 80%;
    margin-bottom: 15px;
    border: 1px solid;
    box-shadow:
      inset 0 0 20px ${({ theme }) => theme.contrasting05},
      0 0 20px ${({ theme }) => theme.contrasting02};
    outline-color: ${({ theme }) => theme.contrasting00};
    outline-offset: 15px;
    text-shadow: 1px 1px 2px ${({ theme }) => theme.base05};
  }
`;

export default Sidebar;
