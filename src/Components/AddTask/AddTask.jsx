import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Svg from "../svgcomp/Svg";
import { useNavigate } from "react-router-dom";
import "./AddTask.css";
function AddTask() {
  const intialTaskValue = {
    heading: "",
    subHeading: "",
    "image/png": [],
    "audio/ogg": [],
    "video/mp4": [],
    moreInfo: "",
  };

  const [task, setTask] = useState(intialTaskValue);
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleAccessiories = async (e) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target.result;

      setTask({
        ...task,
        [e[0].type]: [...task[e[0].type], result],
      });
    };

    reader.readAsDataURL(e[0]);
  };

  const saveTaskToIndexedDB = (task) => {
    const dbName = "myDatabase";
    const dbVersion = 1;

    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      const objectStore = db.createObjectStore("tasks", {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction("tasks", "readwrite");
      const objectStore = transaction.objectStore("tasks");
      const addObjectRequest = objectStore.add(task);

      addObjectRequest.onsuccess = function () {
        console.log("Task has been added to IndexedDB");
      };

      addObjectRequest.onerror = function () {
        console.error("Error adding task to IndexedDB");
      };
    };
  };

  const handleSubmit = () => {
    saveTaskToIndexedDB(task);
    setTask({
      heading: "",
      subHeading: "",
      "image/png": [],
      "audio/ogg": [],
      "video/mp4": [],
      moreInfo: "",
    })
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="addTask_container">
      <div className="task_header">
        <div>
          <Button onClick={() => handleBack()}>
            <ArrowBackIcon style={{ color: "#322f2f" }} />
          </Button>
        </div>
        <div>
          <Button
            className="task_addbtnbtn"
            variant="contained"
            size="small"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="addTask_inputs">
        <div>
          <input
            className="input_heading"
            placeholder="Title"
            name="heading"
            value={task.heading}
            onChange={(e) => handleAddTask(e)}
          />
        </div>
        <div>
          <input
            className="input_subHeading"
            name="subHeading"
            value={task.subHeading}
            onChange={(e) => handleAddTask(e)}
            placeholder="start typing...."
          />
        </div>
      </div>
      <div className="svg_con">
        <Svg handleAccessiories={handleAccessiories} />
      </div>
    </div>
  );
}

export default AddTask;
