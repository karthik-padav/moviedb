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
import placeholderImage from "public/images/placeholderImage.jpg";

const useStyles = makeStyles((theme) => ({}));

export default function CardLayout(props) {
  const { item = {} } = props;

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };
  const imageUrl = item.poster_path
    ? `${constants.imageBaseUrl}${item.poster_path}`
    : placeholderImage;
  return (
    <>
      <Box position="relative">
        <Image
          loader={myLoader}
          src={imageUrl}
          alt={item.title}
          width={500}
          height={750}
          layout="responsive"
          objectFit="cover"
        />
        <Box
          style={{ width: 40, height: 40 }}
          position="absolute"
          top={5}
          right={5}
        >
          <CircularProgressbar
            value={item.vote_average * 10}
            text={`${item.vote_average}%`}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: colors.black,
              textColor: colors.white,
              pathColor: colors.green,
              trailColor: "transparent",
            })}
          />
        </Box>
      </Box>
      <Box py={1}>
        <Typography variant="body2">
          <b>{item.title || item.original_title || item.name}</b>
        </Typography>
        {item.release_date && (
          <Typography variant="caption">
            {moment(item.release_date).format("MMMM Do YYYY")}
          </Typography>
        )}
      </Box>
    </>
  );
}
