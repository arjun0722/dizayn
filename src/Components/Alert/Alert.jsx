import React from "react";
import Alert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
function Alerts({ msg }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
       {msg}
      </Alert>
  </Stack>
  );
}

export default Alerts;
