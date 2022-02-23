import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import DragContainer from "./DragContainer";

const App = () => {
  return (
    <Fragment>
      <div className="main-header">
        <h1 className="main-title">Reactanban</h1>
      </div>
      <DragContainer></DragContainer>
    </Fragment>
  );
};

export default App;
