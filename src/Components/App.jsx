import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

import MainWindow from "./MainWindow/MainWindow";
import SettingsWindow from "./SettingsWindow/SettingsWindow";

const App = () => (
  <Router>
    <Route path="/" exact component={MainWindow} />
    <Route path="/settings/" exact component={SettingsWindow} />
  </Router>
);

export default App;
