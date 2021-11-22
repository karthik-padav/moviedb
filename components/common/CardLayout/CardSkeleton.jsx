import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

export default function CardSkeleton() {
  return (
    <>
      <Skeleton variant="rect" width="100%" height={300} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="75%" />
    </>
  );
}
