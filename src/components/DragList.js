import React, { useEffect, useState } from "react";
import DragColumn from "./DragColumn";

const DragList = (props) => {
  const [columns, setColumns] = useState({
    backlog: {
      id: 1,
      class: "backlog",
      title: "Backlog",
      items: [
        { id: 1, title: "Complete the kanban" },
        { id: 2, title: "Relax" },
      ],
    },
    progress: {
      id: 2,
      class: "progress",
      title: "Processing",
      items: [
        { id: 3, title: "Work on future projects" },
        { id: 4, title: "Chill" },
      ],
    },
    complete: {
      id: 3,
      class: "complete",
      title: "Succeed",
      items: [
        { id: 5, title: "Being awesome" },
        { id: 6, title: "Profit!!!" },
      ],
    },
    "on-hold": {
      id: 4,
      class: "on-hold",
      title: "On hold",
      items: [{ id: 7, title: "Being unpleasant" }],
    },
  });

  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);

  const getLocalColumns = () => {
    if (localStorage.getItem("columns")) {
      setColumns(JSON.parse(localStorage.columns));
    }
  };

  useEffect(() => {
    getLocalColumns();
  }, []);

  const updateLocalColumns = (value) => {
    localStorage.setItem("columns", JSON.stringify(value));
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className == "drag-item") {
      e.target.style.boxShadow = "0 4px 3px wheat";
    }
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dragStartHandler = (e, column, item) => {
    setCurrentColumn(column);
    setCurrentItem(item);
  };

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = "none";
  };

  const dropHandler = (e, column, item) => {
    e.preventDefault();
    e.target.style.boxShadow = "none";
    const currentIndex = currentColumn.indexOf(currentItem);
    currentColumn.splice(currentIndex, 1);

    const dropIndex = column.indexOf(item);
    column.splice(dropIndex, 0, currentItem);
    updateLocalColumns(
      Object.keys(columns).map((key) => {
        if (columns[key].id == column.id) {
          return column;
        }
        if (columns[key].id == currentColumn.id) {
          return currentColumn;
        }
        return columns[key];
      })
    );
    setColumns(
      Object.keys(columns).map((key) => {
        if (columns[key].id == column.id) {
          return column;
        }
        if (columns[key].id == currentColumn.id) {
          return currentColumn;
        }
        return columns[key];
      })
    );
  };

  const dropOnEmptyHandler = (e, column) => {
    e.preventDefault();
    if (column.length == 0) {
      const currentIndex = currentColumn.indexOf(currentItem);
      currentColumn.splice(currentIndex, 1);
      column.push(currentItem);

      updateLocalColumns(
        Object.keys(columns).map((key) => {
          if (columns[key].id == column.id) {
            return column;
          }
          if (columns[key].id == currentColumn.id) {
            return currentColumn;
          }
          return columns[key];
        })
      );
      setColumns(
        Object.keys(columns).map((key) => {
          if (columns[key].id == column.id) {
            return column;
          }
          if (columns[key].id == currentColumn.id) {
            return currentColumn;
          }
          return columns[key];
        })
      );
    }
  };

  const addHandler = (key, text) => {
    setColumns((prev) => {
      const newItems = [...prev[key].items];
      newItems.push({ id: Math.random(), title: text });
      const newColumn = { ...prev[key], items: newItems };
      updateLocalColumns({ ...prev, [key]: newColumn });
      return { ...prev, [key]: newColumn };
    });
  };

  const removeItem = (columnKey, item) => {
    setColumns((prev) => {
      const currentIndex = prev[columnKey].items.indexOf(item);
      const changedItems = [...prev[columnKey].items];

      changedItems.splice(currentIndex, 1);
      const changedColumn = { ...prev[columnKey], items: changedItems };

      updateLocalColumns({ ...prev, [columnKey]: changedColumn });
      return { ...prev, [columnKey]: changedColumn };
    });
  };

  const updateItemText = (columnKey, item, newText) => {
    setColumns((prev) => {
      const currentIndex = prev[columnKey].items.indexOf(item);
      const changedItems = prev[columnKey].items;

      changedItems.splice(currentIndex, 1, newText);
      const changedColumn = { ...prev[columnKey], items: changedItems };

      updateLocalColumns({ ...prev, [columnKey]: changedColumn });
      return { ...prev, [columnKey]: changedColumn };
    });
  };

  const changeItemHandler = (columnKey, item, newText) => {
    if (!newText.title) {
      removeItem(columnKey, item);
    } else {
      updateItemText(columnKey, item, newText);
    }
  };

  return (
    <ul className="drag-list">
      {Object.keys(columns).map((key) => {
        return (
          <DragColumn
            header={columns[key].title}
            className={columns[key].class}
            content={columns[key].items}
            key={columns[key].id}
            id={key}
            onAdd={addHandler}
            onChange={changeItemHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            onDrop={dropHandler}
            onEmptyDrop={dropOnEmptyHandler}
          />
        );
      })}
    </ul>
  );
};

export default DragList;
