import React, { Component, Fragment } from "react";
import { remote, ipcRenderer } from "electron";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";

import GamesList from "./GamesList";
import { checkGameROM } from "../../Shared/GameLoader";
import {
  appStyle,
  buttonStyle,
  headerStyle,
  titlebarStyle
} from "./MainWindow.styles";

import Games from "../../library.json";

class MainWindow extends Component {
  constructor() {
    super();
    this.handleAddGameClick = this.handleAddGameClick.bind(this);
    this.handleSettingsClick = this.handleSettingsClick.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
  }

  state = {
    gamesLibrary: [...Games]
  };

  componentDidUpdate() {
    const { gamesLibrary } = this.state;

    ipcRenderer.send("saveLibraryToFile", gamesLibrary);
  }

  handleAddGameClick() {
    const { gamesLibrary } = this.state;

    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {}, files => {
      if (files && files.length) {
        checkGameROM(files[0]).then(metadata => {
          if (metadata) {
            this.setState({
              gamesLibrary: [
                ...gamesLibrary,
                {
                  id: shortid.generate(),
                  name: files[0].replace(/^.*[\\\/]/, ""),
                  platform: metadata.platform,
                  path: files[0]
                }
              ]
            });
          } else {
            remote.dialog.showMessageBox(remote.getCurrentWindow(), {
              type: "error",
              message: `${files[0]} is not a valid game file`
            });
          }
        });
      }
    });
  }

  handleSettingsClick() {
    ipcRenderer.send("Settings", "open");
  }

  deleteGame(index) {
    const { gamesLibrary } = this.state;
    const newLibrary = [...gamesLibrary];
    newLibrary.splice(index, 1);

    this.setState({
      gamesLibrary: newLibrary
    });
  }

  render() {
    return (
      <Fragment>
        <div css={titlebarStyle} />
        <div css={appStyle}>
          <div css={headerStyle}>
            <h1>Game Library</h1>
            <button css={buttonStyle} onClick={this.handleAddGameClick}>
              Add game
            </button>
            <button css={buttonStyle} onClick={this.handleSettingsClick}>
              Settings
            </button>
          </div>
          <GamesList
            library={this.state.gamesLibrary}
            deleteGame={this.deleteGame}
          />
        </div>
      </Fragment>
    );
  }
}

export default MainWindow;
