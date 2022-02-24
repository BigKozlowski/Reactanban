import React from "react";
import Card from "./UI/Card";

const DragItem = (props) => {
  return (
    <li
      draggable={props.draggable}
      className="drag-item"
      onDragOver={props.onDragOver}
      onDragLeave={props.onDragLeave}
      onDragStart={(e) => props.onDragStart(e, props.column, props.item)}
      onDragEnd={props.onDragEnd}
      onDrop={(e) => props.onDrop(e, props.column, props.item)}
    >
      {props.item.title}
    </li>
  );
};

export default DragItem;
