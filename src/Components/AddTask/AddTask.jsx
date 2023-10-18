import React, { useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Svg from "../svgcomp/Svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Alerts from "../Alert/Alert";
import DeleteIcon from "@mui/icons-material/Delete";

import 'react-toastify/dist/ReactToastify.css';
import "./AddTask.css";
function AddTask() {
  const intialTaskValue = {
    heading: "",
    subHeading: "",
    image: [],
    audio: [],
    video: [],
    moreInfo: "",
  };

  
  const [showAlert, setShowAlert] = useState(false);

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
    const splittedType = e[0].type.split("/");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target.result;

      setTask({
        ...task,
        [splittedType[0]]: [...task[splittedType[0]], result],
      });
    };

    reader.readAsDataURL(e[0]);
  };

  const saveTaskToIndexedDB = (task) => {
    const dbName = "myDatabase";
    const dbVersion = 2;
    const objectStoreName = "tasks";

    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      // Check if the object store already exists
      if (!db.objectStoreNames.contains(objectStoreName)) {
        const objectStore = db.createObjectStore(objectStoreName, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(objectStoreName, "readwrite");
      const objectStore = transaction.objectStore(objectStoreName);
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
    if (task.heading.length > 0 && task.subHeading.length > 0) {
      saveTaskToIndexedDB(task);
      setTask({
        heading: "",
        subHeading: "",
        image: [],
        audio: [],
        video: [],
        moreInfo: "",
      });
      toast.success('Data add successfully', {
        position: toast.POSITION.TOP_RIGHT
    });
    } else {
      // Display the alert
      // setShowAlert(true);
      // setTimeout(() => {
      //   setShowAlert(false);
      // }, 2000);
      toast.error('Error in heading and subheading', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
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
     


      <ToastContainer/>
    </div>
  );
}

export default AddTask;
