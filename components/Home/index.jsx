import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import SearchWrapper from "components/common/SearchWrapper";
import ScrollAbleGrid from "components/common/scrollAbleGrid";
import constants from "js/Constants";
import Container from "@material-ui/core/Container";
import colors from "theme/ThemeColors";

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.common.typographyColor.green,
    // fontSize: "40px",
  },
  subtitle: {
    color: theme.palette.common.typographyColor.green,
    // fontSize: "30px",
  },
  bannerWrapper: {
    backgroundSize: "cover",
    boxShadow: `inset 0 0 0 2000px ${theme.palette.common.blackOpacity}`,
    minHeight: "60vh",
  },
}));

const getBannerImage = (lists = []) => {
  for (const item of lists) {
    if (item?.backdrop_path) return item.backdrop_path;
  }
};

export default function Home(props) {
  const {
    movieTrendingList,
    tvTrendingList,
    populatTvList,
    populatMovieList,
    topRatedTvList,
    topRatedMovieList,
    nowPlayingMovieList,
    onAirTvList,
  } = props;
  const classes = useStyles();
  return (
    <>
      <Box
        py={2}
        className={classes.bannerWrapper}
        display="flex"
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
        style={{
          backgroundImage: `url(
            ${constants.imageBaseUrl}${getBannerImage(
            movieTrendingList?.results
          )}
          )`,
        }}
      >
        <Container>
          <Typography component="h1" variant="h2" className={classes.title}>
            <b>Welcome.</b>
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            className={classes.subtitle}
          >
            <b>
              Millions of movies, TV shows and people to discover. Explore now.
            </b>
          </Typography>
          {/* <Box width={400}>
            <SearchWrapper />
          </Box> */}
        </Container>
      </Box>

      <Container>
        {/* Trending */}
        <Box pt={2}>
          <ScrollAbleGrid
            title={
              <Typography variant="h6" component="p">
                <b>Trending</b>
              </Typography>
            }
            data={[
              {
                id: 1,
                category: "movie",
                title: "Movies",
                data: movieTrendingList?.results,
              },
              {
                id: 2,
                category: "tv",
                title: "TV Shows",
                data: tvTrendingList?.results,
              },
            ]}
          />
        </Box>

        {/* Movies */}
        <Box pt={2}>
          <ScrollAbleGrid
            title={
              <Typography variant="h6" component="p">
                <b>Movies</b>
              </Typography>
            }
            data={[
              {
                id: 1,
                category: "movie",
                title: "Popular",
                data: populatMovieList?.results,
              },
              {
                id: 2,
                category: "movie",
                title: "Top Rated",
                data: topRatedMovieList?.results,
              },
              {
                id: 3,
                category: "movie",
                title: "In Theatres",
                data: nowPlayingMovieList?.results,
              },
            ]}
          />
        </Box>

        {/* TV Shows */}
        <Box pt={2}>
          <ScrollAbleGrid
            title={
              <Typography variant="h6" component="p">
                <b>TV Shows</b>
              </Typography>
            }
            data={[
              {
                id: 1,
                category: "tv",
                title: "Popular",
                data: populatTvList?.results,
              },
              {
                id: 2,
                category: "tv",
                title: "Top Rated",
                data: topRatedTvList?.results,
              },
              {
                id: 3,
                category: "tv",
                title: "On Air",
                data: onAirTvList?.results,
              },
            ]}
          />
        </Box>
      </Container>
    </>
  );
}
