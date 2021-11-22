import React from "react";
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

const useStyles = makeStyles((theme) => ({}));

export default function ProfileCardLayout(props) {
  const { item = {} } = props;
  const classes = useStyles();

  return (
    <>
      <Box>
        <Image
          src={`${constants.imageBaseUrl}${item.profile_path}`}
          alt={item.title}
          width={500}
          height={750}
        />
      </Box>
      <Box>
        <Typography variant="body2" component="h1">
          <b>{item.title || item.original_title || item.name}</b>
        </Typography>
        {item?.character && (
          <Typography variant="caption">{item.character}</Typography>
        )}
      </Box>
    </>
  );
}
