import React, { Fragment, useState } from "react";

const ButtonGroup = (props) => {
  const [displayInput, setDisplayInput] = useState(false);
  const [newElement, setNewElement] = useState("");

  const showInputBox = (e) => {
    setDisplayInput(true);
  };
  const hideInputBox = () => {
    setDisplayInput(false);
  };
  const addItem = (id, text) => {
    props.onAdd(id, newElement);
    hideInputBox();
  };

  return (
    <Fragment>
      <div className="add-btn-group">
        {!displayInput && (
          <div className="add-btn" onClick={showInputBox}>
            <span className="plus-sign">+</span>
            <span>Add item</span>
          </div>
        )}
        {displayInput && (
          <div
            className="add-btn solid"
            onClick={() => addItem(props.id, "test")}
          >
            <span>Save item</span>
          </div>
        )}
      </div>
      {displayInput && (
        <div className="add-container">
          <div
            className="add-item"
            contentEditable="true"
            onInput={(e) => setNewElement(e.target.innerHTML)}
          ></div>
        </div>
      )}
    </Fragment>
  );
};

export default ButtonGroup;
