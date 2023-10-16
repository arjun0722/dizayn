import React from "react";
import ReactPlayer from "react-player/youtube";
import { Container, Paper } from "@mui/material";

const AudioPlayer = () => {
  const audioSource = "https://www.example.com/your-audio.mp3";

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Paper sx={{ padding: "16px", marginTop: "32px" }}>
        <ReactPlayer url={audioSource} controls width="100%" height="50px" />
      </Paper>
    </Container>
  );
};

export default AudioPlayer;
