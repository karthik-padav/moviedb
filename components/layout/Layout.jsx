import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import HeaderWrapper from "components/header/HeaderWrapper";
import Footer from "components/Footer";
import { makeStyles } from "@material-ui/core/styles";
import colors from "theme/ThemeColors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getList } from "js/Api";
import Container from "@material-ui/core/Container";

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  const getGenreList = async () => {
    const movieGenre = await getList({ path: "/genre/movie/list" });
    const tvGenre = await getList({ path: "/genre/tv/list" });
  };

  useEffect(() => {
    getGenreList();
  }, []);

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  appBarWrapper: {
    backgroundColor: colors.black,
  },
}));

export default function Layout(props) {
  const classes = useStyles();
  return (
    <>
      <Container>
        <HideOnScroll {...props}>
          <AppBar color="inherit" className={classes.appBarWrapper}>
            <Toolbar>
              <HeaderWrapper />
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Container>
      <Toolbar />
      <Box>
        <main>{props.children}</main>
      </Box>
      <footer className={classes.appBarWrapper}>
        <Footer />
      </footer>
    </>
  );
}
