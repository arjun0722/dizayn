import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Svg from "../svgcomp/Svg";
import DeleteIcon from "@mui/icons-material/Delete";
import Alerts from "../Alert/Alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import "./Page.css";

function Page() {
  const [showAlert, setShowAlert] = useState(false);
  const [indexDbData, setIndexDbData] = useState();
  const navigate = useNavigate();
  const { index } = useParams();
  const cardIndex = Number(index);



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
          setIndexDbData(data[cardIndex]);
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

  const handleAccessiories = async (e) => {
    const reader = new FileReader();
    const splittedType = e[0].type.split("/");
    reader.onload = async (event) => {
      const result = event.target.result;

      setIndexDbData({
        ...indexDbData,
        [splittedType[0]]: [...indexDbData[splittedType[0]], result],
      });
    };

    reader.readAsDataURL(e[0]);
  };

  const handleOnchnageInput = (e) => {
    const { name, value } = e.target;
    setIndexDbData({
      ...indexDbData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const dbName = "myDatabase";
    const dbVersion = 2;

    const request = indexedDB.open(dbName, dbVersion);

    request.onsuccess = function (event) {
      const db = event.target.result;

      const transaction = db.transaction("tasks", "readwrite");

      const objectStore = transaction.objectStore("tasks");

      objectStore.put(indexDbData);

      transaction.oncomplete = function () {
        console.log("Data has been updated in IndexedDB");
      };

      transaction.onerror = function (event) {
        console.error(
          "Error updating data in IndexedDB: " + event.target.error
        );
      };
    };
    // window.location.reload();
    toast.success('data update successfully', {
      position: toast.POSITION.TOP_RIGHT
  });

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleDelete = (acess, index) => {
    if (acess === "image") {
      indexDbData["image"].splice(index, 1);
  const newImageArr = indexDbData["image"]

      setIndexDbData({
        ...indexDbData,
       [ indexDbData["image"]] : newImageArr
      });
    } else {
      indexDbData["video"].splice(index, 1);
      const newVideoArr = indexDbData["video"]
       setIndexDbData({
        ...indexDbData,
        [ indexDbData["video"]] : newVideoArr
       });
    }
  };

 

  return (
    <div className="containerStyle">
      
      <div className="conHeader">
        <div>
          <Button onClick={() => handleBack()}>
            <ArrowBackIcon style={{ color: "#322f2f" }} />
          </Button>
        </div>
        <div>
          {" "}
          <Button
            className="page_sub"
            variant="contained"
            size="small"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="con">
        <div>
          {indexDbData && indexDbData.heading && (
            <div className="titleStyle">{indexDbData.heading}</div>
          )}
        </div>
        <div className="contentStyle">
          {indexDbData && indexDbData.subHeading && (
            <div className="contentStyle">{indexDbData.subHeading}</div>
          )}
        </div>
        <div className="contentStyle">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, rem
        </div>
      </div>
      <div className="centerBox">
        <div>
          {indexDbData && indexDbData["audio"].length > 0 ? (
            <div>
              {/* <div className="titleStyle">Audio:</div> */}
              <div>
                {indexDbData["audio"].map((audio, ind) => {
                  return (
                    <audio className="audio1" controls>
                      <source src={audio} />
                    </audio>
                  
                  );
                })}
              </div>
            </div>
          ) : null}

          <br />
          {indexDbData && indexDbData["image"].length > 0 ? (
            <div className="image-container">
              {indexDbData["image"].map((img, ind) => (
                <div className="image-wrapper" key={ind}>
                  <img className="images1" src={img} />
                  <div className="delete-icon">
                    <DeleteIcon onClick={() => handleDelete("image", img)} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/* <br /> */}

          {indexDbData && indexDbData["video"].length > 0 ? (
            <div className="image-container">
              {indexDbData["video"].map((video, ind) => (
                <div className="image-wrapper" key={ind}>
                  <video className="images1" controls>
                    <source src={video} />
                  </video>
                  <div className="delete-icon">
                    <DeleteIcon onClick={() => handleDelete("video", video)} />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="svg_control_div">
        <Svg handleAccessiories={handleAccessiories} />
      </div>
      {/* <AudioPlayer /> */}
      <div className="conLorem">
        <div className="contentStyle">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, rem
        </div>
        <br />
        <div className="contentStyle">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting, rem
        </div>

        <div>
          <input
            className="moreInfo_indexDb"
            value={indexDbData?.moreInfo}
            placeholder="start typing...."
            onChange={(e) => handleOnchnageInput(e)}
            name="moreInfo"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Page;
