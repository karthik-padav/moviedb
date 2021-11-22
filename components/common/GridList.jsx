import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import "react-circular-progressbar/dist/styles.css";
import { calculateCols } from "js/CommonUtils";

const useStyles = makeStyles((theme) => ({
  imageList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

function getWindowDimensions() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export default function GridListWrapper(props) {
  const classes = useStyles();
  const { children, cols = 7.5 } = props;
  const [windowDimensions, setWindowDimensions] = useState();
  const isServer = typeof window === "undefined";

  // useEffect(() => {
  //   if (!isServer) {
  //     function handleResize() {
  //       setWindowDimensions(getWindowDimensions());
  //     }
  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }
  // }, []);

  return (
    <Box position="relative">
      <ImageList
        className={classes.imageList}
        cols={cols}
        rowHeight="auto"
        gap={10}
      >
        {children}
      </ImageList>
    </Box>
  );
}
