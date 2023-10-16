import React from "react";
import Task from "./Components/Task/Task";
import "./App.css";
import AddTask from "./Components/AddTask/AddTask";
import Page from "./Components/Page/Page";
import { Routes,Route } from 'react-router-dom';
import AudioPlayer from "./Components/Audioplayer/audioplayer";

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Task/>}/>
    <Route path='/addtask' element={<AddTask/>}/>
    <Route path='/page/:index' element={<Page/>}/>
  </Routes>
  {/* <AudioPlayer /> */}
    </div>
  );
}

export default App;
