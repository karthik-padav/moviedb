import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Grid, Paper } from "@material-ui/core";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import constants from "js/Constants";
import Image from "next/image";
import { Typography } from "@material-ui/core";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import colors from "theme/ThemeColors";
import ScrollAbleGrid from "components/common/scrollAbleGrid";
import GridListWrapper from "components/common/GridList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Link from "next/link";
import VideoCardLayout from "components/common/VideoCardLayout";
import VideoCardLayoutLoader from "components/common/VideoCardLayout/VideoCardLayoutLoader";
import { useEffect, useState } from "react";
import { getList } from "js/Api";

const useStyles = makeStyles((theme) => ({}));

export default function Trailer({ details, platform }) {
  const [videosObj, setVideos] = useState({
    loader: false,
    videos: null,
  });

  /** Videos */
  const getVideos = async () => {
    setVideos({ loader: true, videos: null });
    const videos = await getList({
      path: `/${platform}/${details.id}/videos`,
    });
    setVideos({ loader: false, videos: videos?.data?.results });
  };

  useEffect(() => {
    getVideos();
  }, []);

  const { loader, videos } = videosObj;

  return (
    <Container>
      <Typography variant="h6">
        <b>Trailer</b>
      </Typography>
      <Box my={2}>
        <GridListWrapper md={3.5} sm={1.5} xs={1.5}>
          {loader &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <ImageListItem key={item}>
                <VideoCardLayoutLoader />
              </ImageListItem>
            ))}
          {!loader &&
            videos &&
            videos.map((item, index) => {
              if (item.key)
                return (
                  <ImageListItem key={index}>
                    <VideoCardLayout data={item} />
                  </ImageListItem>
                );
              return null;
            })}
        </GridListWrapper>
      </Box>
    </Container>
  );
}
