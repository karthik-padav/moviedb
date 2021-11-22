import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box, Grid, Paper } from "@material-ui/core";
import _get from "lodash/get";
import constants from "js/Constants";
import Image from "next/image";
import { Typography } from "@material-ui/core";
import moment from "moment";
import Chip from "@material-ui/core/Chip";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import colors from "theme/ThemeColors";

const useStyles = makeStyles((theme) => ({
  bannerWrapper: {
    backgroundSize: "cover",
    boxShadow: `inset 0 0 0 2000px ${theme.palette.common.blackOpacity}`,
    minHeight: "80vh",
  },
  displayInlineBlock: {
    display: "inline-block",
  },
  colorWhite: {
    color: theme.palette.common.typographyColor.white,
  },
}));

export default function Banner(props) {
  const { details } = props;
  const classes = useStyles();
  return (
    <>
      <Box
        className={classes.bannerWrapper}
        style={{
          backgroundImage: `url(
            ${constants.imageBaseUrl}${details.backdrop_path}
          )`,
        }}
        alignItems="center"
        display="flex"
        pb={4}
      >
        <Container>
          <Grid container>
            <Grid item md={4} sm={12}>
              <Box display="flex" justifyContent="center" pt={4}>
                <Paper className={classes.displayInlineBlock}>
                  <Box p={1}>
                    <Image
                      src={`${constants.imageBaseUrl}${details.poster_path}`}
                      alt={details.title}
                      width={250}
                      height={350}
                    />
                  </Box>
                </Paper>
              </Box>
            </Grid>
            <Grid item md={8} sm={12}>
              <Box
                display="flex"
                height="100%"
                flexDirection="column"
                justifyContent="center"
                pt={4}
              >
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    className={classes.colorWhite}
                  >
                    <b>
                      {details.title || details.original_title || details.name}
                    </b>{" "}
                    {details.release_date &&
                      `(${moment(details.release_date).format("YYYY")})`}
                  </Typography>

                  {details.tagline && (
                    <Typography variant="body2" className={classes.colorWhite}>
                      <i>{details.tagline}</i>
                    </Typography>
                  )}
                </Box>

                {details?.genres && (
                  <Box display="flex">
                    {details.genres.map((item, index) => (
                      <Box key={index} mt={0.7} mr={0.5}>
                        <Chip
                          color="primary"
                          label={
                            <Typography variant="caption">
                              {item.name}
                            </Typography>
                          }
                          size="small"
                        />
                      </Box>
                    ))}
                  </Box>
                )}

                {details?.vote_average > 0 && (
                  <Box width={60} height={60} mt={2}>
                    <CircularProgressbar
                      value={details.vote_average * 10}
                      text={`${details.vote_average}%`}
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
                )}

                <Box mt={2}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="p"
                    className={classes.colorWhite}
                  >
                    <b>Overview:</b>
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.colorWhite}
                  >
                    {details.overview}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
