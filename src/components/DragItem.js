import React from "react";
import Card from "./UI/Card";

const DragItem = (props) => {
  return (
    <Card className="drag-item">
      <li>{props.text}</li>
    </Card>
  );
};

export default DragItem;
