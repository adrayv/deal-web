import React from 'react';
import styled, { keyframes } from 'styled-components';
import useModal from 'hooks/useModal';

const revealAnimation = keyframes`
	0% {
		opacity: 0;
		transform: translateY(-100%);
	}
	50% {
		transform: translateY(-45%);
	}
	100% {
		opacity: 1;
		transform: translateY(-50%);
	}
`;

const fadeInAnimation = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  & > div {
    position: relative;
    height: 100%;
    width: 100%;
  }
  z-index: 100;
  animation: ${fadeInAnimation} 0.5s ease;
  display: ${props => (props.isActive ? 'initial' : 'none')};
`;

const Bg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 101;
  top: 0;
  left: 0;
`;

const PopupContainer = styled.div`
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 0;
  right: 0;
  margin: auto;
  top: 50%;
  & > div {
    transform: translateY(-50%);
    animation: ${revealAnimation} 0.65s ease;
  }
  z-index: 102;
`;

export default () => {
  const { component, removeComponent } = useModal();
  return (
    <Wrapper isActive={Boolean(component)}>
      <div>
        <Bg className="popupBackground" onClick={removeComponent} />
        <PopupContainer>
          <div>{component}</div>
        </PopupContainer>
      </div>
    </Wrapper>
  );
};
