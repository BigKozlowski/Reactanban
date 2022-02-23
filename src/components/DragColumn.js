import React from "react";
import DragItem from "./DragItem";
import Card from "./UI/Card";
import ButtonGroup from "./ButtonGroup";

const DragColumn = (props) => {
  return (
    <Card className={`drag-column ${props.className}-column`}>
      <li>
        <span className="header">
          <h1>{props.header}</h1>
        </span>
        <div className={`${props.className}-content custom-scroll`}>
          <ul>
            {props.content.map((el, index) => (
              <DragItem text={el} key={index} />
            ))}
          </ul>
        </div>
        <ButtonGroup onAdd={props.onAdd}></ButtonGroup>
      </li>
    </Card>
  );
};

export default DragColumn;
