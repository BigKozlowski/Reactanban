import React, { useEffect, useState } from "react";
import DragColumn from "./DragColumn";

const DragList = (props) => {
  const [backlogItems, setBacklogItems] = useState([]);
  const [progressItems, setProgressItems] = useState([]);
  const [completeItems, setCompleteItems] = useState([]);
  const [onHoldItems, setOnHoldItems] = useState([]);

  const getLocalColumns = () => {
    if (
      localStorage.getItem("backlogItems") &&
      localStorage.getItem("progressItems") &&
      localStorage.getItem("completeItems") &&
      localStorage.getItem("onHoldItems")
    ) {
      setBacklogItems(JSON.parse(localStorage.backlogItems));
      setProgressItems(JSON.parse(localStorage.progressItems));
      setCompleteItems(JSON.parse(localStorage.completeItems));
      setOnHoldItems(JSON.parse(localStorage.onHoldItems));
    } else {
      setBacklogItems(["Complete the kanban", "Relax"]);
      setProgressItems(["Work on future projects", "Chill"]);
      setCompleteItems(["Being awesome", "Profit!!!"]);
      setOnHoldItems(["Being unpleasant"]);
    }
  };
  // (key, value) => {
  //   setBacklogItems(prev => {
  //     return {
  //       ...prev, [key]: value
  //     }
  //   })
  // }

  useEffect(() => {
    getLocalColumns();
  }, []);

  const getArrayFromColumnKey = (key) => {
    switch (key) {
      case "backlogItems":
        return backlogItems;
      case "progressItems":
        return progressItems;
      case "completeItems":
        return completeItems;
      case "onHoldItems":
        return onHoldItems;
    }
  };

  const setters = {
    backlogItems: setBacklogItems,
    progressItems: setProgressItems,
    completeItems: setCompleteItems,
    onHoldItems: setOnHoldItems,
  };

  const addElementToColumn = (key) => {
    return (value) => () => {
      return setters[key]((prev) => {
        for (const el of columns) {
          if (el.key == key) {
            localStorage.setItem(key, JSON.stringify([...prev, value]));
          } else {
            localStorage.setItem(
              el.key,
              JSON.stringify(getArrayFromColumnKey(el.key))
            );
          }
        }

        return [...prev, value];
      });
    };
  };

  const columns = [
    {
      class: "backlog",
      header: "Backlog",
      key: "backlogItems",
    },
    {
      class: "progress",
      header: "Processing",
      key: "progressItems",
    },
    {
      class: "complete",
      header: "Succeed",
      key: "completeItems",
    },
    {
      class: "on-hold",
      header: "On hold",
      key: "onHoldItems",
    },
  ];

  return (
    <ul className="drag-list">
      {columns.map((el) => {
        return (
          <DragColumn
            header={el.header}
            className={el.class}
            key={el.class}
            content={getArrayFromColumnKey(el.key)}
            onAdd={addElementToColumn(el.key)}
          />
        );
      })}
    </ul>
  );
};

export default DragList;
