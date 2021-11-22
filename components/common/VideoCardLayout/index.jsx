import { useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import constants from "js/Constants";
import Image from "next/image";
import colors from "theme/ThemeColors";
import moment from "moment";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({}));

export default function VideoCardLayout({ data }) {
  const { key, name } = data;

  const [showModal, toggleModal] = useState(false);

  return (
    <>
      <Box position="relative" display="inlineBlock">
        <iframe
          id="ytplayer"
          type="text/html"
          width="100%"
          height="150px"
          src={`https://www.youtube-nocookie.com/embed/${key}`}
          frameBorder="0"
        ></iframe>
        <Typography>{name}</Typography>
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          onClick={() => toggleModal(true)}
        ></Box>
      </Box>

      {showModal && (
        <Dialog
          open={showModal}
          onClose={() => toggleModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
        >
          <Box p={2} width="100%" height="100vh">
            <iframe
              id="ytplayer"
              type="text/html"
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${key}`}
              frameBorder="0"
            ></iframe>
          </Box>
        </Dialog>
      )}
    </>
  );
}
