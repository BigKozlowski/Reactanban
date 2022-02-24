import React, { Fragment, useState } from "react";
import Card from "./UI/Card";

const DragItem = (props) => {
  const [changedItem, setChangedItem] = useState(props.item);
  const [isEditing, setIsEditing] = useState(false);

  const changeElementText = (newText) => {
    setChangedItem({ id: props.item.id, title: newText });
  };

  const stopEditing = () => {
    setIsEditing(false);
    props.onChange(props.columnId, props.item, changedItem);
  };

  return (
    <Fragment>
      {!isEditing && (
        <li
          draggable={props.draggable}
          className="drag-item"
          onDragOver={props.onDragOver}
          onDragLeave={props.onDragLeave}
          onDragStart={(e) => props.onDragStart(e, props.column, props.item)}
          onDragEnd={props.onDragEnd}
          onDrop={(e) => props.onDrop(e, props.column, props.item)}
          onClick={() => {
            setIsEditing(true);
          }}
        >
          {props.item.title}
        </li>
      )}
      {isEditing && (
        <li className="drag-item-input">
          <input
            defaultValue={props.item.title}
            onInput={(e) => changeElementText(e.target.value)}
            onBlur={stopEditing}
          ></input>
        </li>
      )}
    </Fragment>
  );
};

export default DragItem;
