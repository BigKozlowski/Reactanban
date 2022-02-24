import React from "react";

const ButtonGroup = (props) => {
  return (
    <div className="add-btn-group">
      <div className="add-btn" onClick={() => props.onAdd(props.id, "test")}>
        <span className="plus-sign">+</span>
        <span>Add item</span>
      </div>
      <div className="add-btn solid">
        <span>Save item</span>
      </div>
      <div className="add-container">
        <div className="add-item"></div>
      </div>
    </div>
  );
};

export default ButtonGroup;
