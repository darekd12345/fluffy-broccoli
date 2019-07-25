import React, { Component } from "react";
import os from "os";

import { loadSettingsToJSON } from "../../Shared/SettingsLoader";
import {
  SettingsContainer,
  SettingsSidebar,
  SidebarItem
} from "./SettingsWindow.styles";

const Tabs = [
  "General",
  "Game Library",
  "Audio",
  "Video",
  "Input",
  "Core-Specific",
  "Advanced"
];

class SettingsWindow extends Component {
  constructor() {
    super();
    this.settings = null;
  }

  state = {
    currentTab: 0
  };

  componentDidMount() {
    document.title = "Settings";
    loadSettingsToJSON(`${os.homedir()}/.mednafen/mednafen.cfg`).then(
      settings => {
        this.settings = settings;
        console.log(this.settings);
      }
    );
  }

  render() {
    const { currentTab } = this.state;
    const sidebarTabs = Tabs.map((item, key) => (
      <SidebarItem key={key} active={key === currentTab}>
        {item}
      </SidebarItem>
    ));

    return (
      <SettingsContainer>
        <SettingsSidebar>{sidebarTabs}</SettingsSidebar>
        <div>aaa</div>
      </SettingsContainer>
    );
  }
}

export default SettingsWindow;
