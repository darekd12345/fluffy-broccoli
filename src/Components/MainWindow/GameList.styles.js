import styled from "@emotion/styled";

export const GameListContainer = styled.div`
  display: flex;
`;

export const PlatformsContainer = styled.div`
  min-width: 200px;
`;

export const PlatformItem = styled.div`
  background: none;
  padding: 8px 8px;
  font-size: 0.8rem;
  border-radius: 3px;
  ${props => props.active && "color: black; background-color: white;"}
  transition: transform 0.1s, background-color 0.1s;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.1s, background-color 0.1s;
    background-color: rgba(255, 255, 255, 0.2);
    ${props =>
      props.active &&
      "color: black; background-color: rgba(255, 255, 255, 0.9);"}
  }
`;
