/** @jsx jsx */
import React, { Component } from "react";
import { jsx, css } from "@emotion/core";
import { remote, ipcRenderer } from "electron";
import { spawn } from "child_process";

import Game from "./Game";
import CONSTS from "../../Shared/Consts";

import {
  GameListContainer,
  PlatformsContainer,
  PlatformItem
} from "./GameList.styles";

const listStyle = css`
  display: flex;
  float: left;
  flex-wrap: wrap;
`;

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.contextMenu = null;
    this.executeGame = this.executeGame.bind(this);
  }

  state = {
    currentPlatform: 0
  };

  componentDidMount() {
    const { library } = this.props;
    const { Menu } = remote;
    const { deleteGame } = this.props;
    const executeGame = this.executeGame;

    const menuTemplate = [
      {
        label: "Run",
        click() {
          executeGame(library[contextMenu._currentGameId].path);
        }
      },
      { type: "separator" },
      { label: "Rename" },
      { label: "Core Settings" },
      { type: "separator" },
      {
        label: "Delete",
        click() {
          deleteGame(contextMenu._currentGameId);
        }
      }
    ];

    this.contextMenu = Menu.buildFromTemplate(menuTemplate);

    const contextMenu = this.contextMenu;
  }

  setFilter(index) {
    this.setState({ currentPlatform: index });
  }

  displayContextMenu(index) {
    this.contextMenu._currentGameId = index;
    this.contextMenu.popup({ window: remote.getCurrentWindow() });
  }

  executeGame(path) {
    const mednafen = spawn("mednafen", [path]);
    ipcRenderer.send("windowEvent", "hide");

    mednafen.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });

    mednafen.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
    });

    mednafen.on("close", code => {
      console.log(`child process exited with code ${code}`);
      ipcRenderer.send("windowEvent", "show");
    });
  }

  render() {
    const { library } = this.props;
    const { currentPlatform } = this.state;

    const games = library
      .filter(game =>
        currentPlatform
          ? game.platform ===
            Object.keys(CONSTS.CONSOLE_NAMES)[currentPlatform - 1]
          : true
      )
      .map(game => (
        <Game
          key={game.id}
          name={game.name}
          bg={game.bg}
          path={game.path}
          handleContextMenu={() => {
            this.displayContextMenu(game.id);
          }}
          executeGame={this.executeGame}
        />
      ));

    const platforms = ["All"]
      .concat(Object.values(CONSTS.CONSOLE_NAMES))
      .map((platform, index) => (
        <PlatformItem
          key={index}
          active={index === currentPlatform}
          onClick={() => {
            this.setFilter(index);
          }}
        >
          {platform}
        </PlatformItem>
      ));

    return (
      <GameListContainer>
        <PlatformsContainer>{platforms}</PlatformsContainer>
        <div css={listStyle}>{games}</div>
      </GameListContainer>
    );
  }
}

export default GamesList;
