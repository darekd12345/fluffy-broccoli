import React from "react";

import { GameBlock, ButtonSpan, Title } from "./Game.styles";

const Game = ({ name, bg, path, handleContextMenu, executeGame }) => {
  return (
    <GameBlock
      bg={bg}
      onClick={() => {
        executeGame(path);
      }}
      onContextMenu={handleContextMenu}
    >
      <ButtonSpan>
        <Title>{name}</Title>
      </ButtonSpan>
    </GameBlock>
  );
};

export default Game;
