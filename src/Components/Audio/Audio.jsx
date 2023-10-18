import React from 'react';
import { Button, Slider, Typography } from '@mui/material';
import { PlayArrow, Pause, VolumeUp, VolumeOff } from '@mui/icons-material';

const AudioPlayer = ({audio}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [volume, setVolume] = React.useState(50);

  const audioRef = React.useRef(new Audio(audio));

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    audioRef.current.volume = newValue / 100;
  };

  return (
    <div>
      <Button onClick={togglePlay}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </Button>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <Typography id="volume-slider" gutterBottom>
            Volume
          </Typography>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            aria-labelledby="volume-slider"
          />
        </div>
        <Button onClick={() => setVolume(0)}>
          {volume > 0 ? <VolumeUp /> : <VolumeOff />}
        </Button>
      </div>
      <audio ref={audioRef}>
        <source src="your_audio_file.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
