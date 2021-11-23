import Layout from "components/layout/Layout";
import { getList } from "js/Api";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Grid, Paper, Typography } from "@material-ui/core";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import constants from "js/Constants";
import Banner from "./Banner";
import { useState, useEffect } from "react";
import Cast from "./Cast";
import Chip from "@material-ui/core/Chip";
import RightSidePanel from "./RightSidePanel";
import Trailer from "./Trailer";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({}));

export default function DetailPage(props) {
  const { details, platform } = props;
  const classes = useStyles();
  const [providers, setProviders] = useState({
    loader: false,
    providers: null,
  });
  const [episode, setEpisode] = useState({
    loader: false,
    episode: null,
  });

  useEffect(() => {
    onLoad();
  }, []);

  /** Provider */
  const getProviders = async () => {
    setProviders({ loader: true, providers: null });
    const providers = await getList({
      path: `/${platform}/${details.id}/watch/providers`,
    });
    setProviders({ loader: false, providers: providers?.data?.results });
  };

  /** Episode */
  const getEpisode = async () => {
    setEpisode({ loader: true, episode: null });
    const episode = await getList({
      path: `/${platform}/${details.id}/episode_groups`,
    });
    setEpisode({ loader: false, episode: episode?.data });
  };

  const onLoad = async () => {
    getProviders();

    if (platform === "tv") {
      getEpisode();
    }
  };
  return (
    <>
      <Banner
        details={details}
        // providers={providers}
        // videos={videos}
        // credits={credits}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <Box pt={2}>
            <Cast details={details} platform={platform} />
          </Box>
          <Box pt={2}>
            <Trailer details={details} platform={platform} />
          </Box>
          <Box pt={2}>
            <Review details={details} platform={platform} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <RightSidePanel details={details} platform={platform} />
        </Grid>
      </Grid>
    </>
  );
}
