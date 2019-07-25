import styled from "@emotion/styled";

export const GameBlock = styled.button`
  background-image: url(${props => props.bg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  height: 200px;
  position: relative;
  margin: 20px;
  transition: transform 0.2s;

  &:before {
    opacity: 0.5;
    content: "";
    display: block;
    position: absolute;
    background-color: black;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background: linear-gradient(
      180deg,
      rgba(14, 0, 255, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
`;

export const ButtonSpan = styled.span`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
`;

export const Title = styled.div`
  color: white;
  width: 100%;
  text-align: center;
  padding: 10px;
  text-shadow: rgba(0, 0, 0, 1) 0px 3px 8px;
  position: relative;
`;
