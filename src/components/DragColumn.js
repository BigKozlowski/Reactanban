import React from "react";
import DragItem from "./DragItem";
import Card from "./UI/Card";
import ButtonGroup from "./ButtonGroup";

const DragColumn = (props) => {
  return (
    <li
      onDrop={(e) => props.onEmptyDrop(e, props.content)}
      onDragOver={(e) => props.onDragOver(e)}
      onDragLeave={(e) => props.onDragLeave(e)}
      onDragEnd={(e) => props.onDragEnd(e)}
      className={`drag-column ${props.className}-column`}
    >
      <span className="header">
        <h1>{props.header}</h1>
      </span>
      <div className={`${props.className}-content custom-scroll`}>
        <ul>
          {props.content.map((el) => {
            return (
              <DragItem
                text={el.title}
                key={el.id}
                columnId={props.id}
                draggable={true}
                onChange={props.onChange}
                onDragOver={props.onDragOver}
                onDragLeave={props.onDragLeave}
                onDragStart={props.onDragStart}
                onDragEnd={props.onDragEnd}
                onDrop={props.onDrop}
                column={props.content}
                item={el}
              />
            );
          })}
        </ul>
      </div>
      <ButtonGroup onAdd={props.onAdd} id={props.id}></ButtonGroup>
    </li>
  );
};

export default DragColumn;
