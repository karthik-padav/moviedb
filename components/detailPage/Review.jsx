import { useState, useEffect } from "react";
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
import ProfileCardLayout from "components/common/ProfileCardLayout";
import { getList } from "js/Api";

const useStyles = makeStyles((theme) => ({}));

export default function Review({ platform, details }) {
  const classes = useStyles();
  const [reviews, setReviews] = useState({ loader: false });
  const [page, setPage] = useState(1);
  const [readMoreId, setReadMoreId] = useState(null);

  /** Reviews */
  const getReviews = async () => {
    setReviews({ loader: true });
    let obj = {};
    const reviews = await getList({
      path: `/${platform}/${details.id}/reviews`,
      querry: `&page=${page}`,
    });
    if (reviews?.data?.results) obj = reviews.data;
    setReviews({ loader: false, ...obj });
  };

  useEffect(() => {
    getReviews();
  }, []);

  if (reviews?.results?.length === 0) return null;

  return (
    <Container>
      <Typography variant="h6">
        <b>Review</b>
      </Typography>
      {reviews.results && (
        <Box my={2}>
          {reviews.results.map((item, index) => (
            <Box mb={2} key={index}>
              <Paper>
                <Box p={2}>
                  <Typography variant="body2">
                    <b>Written by </b>
                    {item?.author_details?.username ||
                      item?.author_details?.name ||
                      item?.author ||
                      ""}
                  </Typography>
                  {item?.created_at && (
                    <Typography variant="caption">
                      On: {moment(item.created_at).format("DD MMM YYYY")}
                    </Typography>
                  )}
                  <Box mt={1}>
                    <Typography variant="body2">
                      {item.content.length > 400
                        ? `${item.content.substring(0, 400)}...`
                        : item.content}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
