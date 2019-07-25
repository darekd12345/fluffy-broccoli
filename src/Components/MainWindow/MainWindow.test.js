import React from "react";
import ReactDOM from "react-dom";
import MainWindow from "./MainWindow";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MainWindow />, div);
  ReactDOM.unmountComponentAtNode(div);
});
