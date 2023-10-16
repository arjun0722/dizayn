import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { format } from 'date-fns';

import "./Task.css";

function Task() {
  const [indexDbData, setIndexDbData] = useState();
  const navigate = useNavigate();
  const currentDateTime = new Date();
const formattedDateTime = format(currentDateTime, "HH:mm a dd MMM");


const retrieveDataFromIndexedDB = () => {
  const dbName = "myDatabase";

  const request = indexedDB.open(dbName);

  request.onsuccess = function (event) {
    const db = event.target.result;

    if (db.objectStoreNames.contains("tasks")) {
      const transaction = db.transaction("tasks", "readonly");
      const objectStore = transaction.objectStore("tasks");

      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function () {
        const data = getRequest.result;
        setIndexDbData(data);
        console.log("Data retrieved from IndexedDB:", data);
      };

      getRequest.onerror = function () {
        console.error("Error retrieving data from IndexedDB");
      };
    } else {
      console.error("The 'tasks' object store does not exist.");
    }
  };
};



  useEffect(() => {
    retrieveDataFromIndexedDB();
  }, []);

  const handleRoute = () => {
    navigate("/addtask");
  };

  const handleCardClick = (index) => {
    navigate(`/page/${index}`);
  };

  return (
    <div className="container">
      <div className="task_con1">
        <div className="task_header">
          <div className="task_notes">Notes</div>
          <div className="btn_task">
            <Button
              className="task_addbtn"
              variant="contained"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => handleRoute()}
            >
              New
            </Button>
          </div>
        </div>
      </div>
      <div className="task_con2">
        {indexDbData &&
          indexDbData.length > 0 &&
          indexDbData?.map((data, index) => {
            return (
              <Card
                onClick={() => handleCardClick(index)}
                key={index}
                className="card_task"
              >
                <CardContent>
                  <Typography
                    sx={{ mb: 1 }}
                    className="typo_heading"
                    color="text.secondary"
                  >
                    {data.heading}
                  </Typography>

                  <Typography
                    sx={{ mb: 1 }}
                    className="typo_subHeading"
                    color="text.secondary"
                  >
                    {data.subHeading}
                  </Typography>
                  <Typography
                    sx={{ mb: 1 }}
                    className="typo_time"
                    color="text.secondary"
                  >
                    {formattedDateTime}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </div>
      <div></div>
    </div>
  );
}

export default Task;
