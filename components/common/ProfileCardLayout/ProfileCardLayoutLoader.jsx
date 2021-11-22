import React from "react";
import { Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

export default function ProfileCardLayoutLoader() {
  return (
    <Box>
      <Skeleton variant="rect" width="100%" height={170} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="70%" />
    </Box>
  );
}
