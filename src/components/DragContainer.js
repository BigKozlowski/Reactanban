import React from "react";
import DragColumn from "./DragColumn";
import DragList from "./DragList";
import Card from "./UI/Card";

const DragContainer = (props) => {
  return (
    <ul className="drag-container">
      <DragList></DragList>
    </ul>
  );
};

export default DragContainer;
