import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import MenuButton from "components/common/MenuButton";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  colorGreen: {
    color: theme.palette.common.typographyColor.green,
  },
}));

export default function HeaderWrapper() {
  const classes = useStyles();
  return (
    <Box display="flex">
      <Link href="/">
        <Box
          component="a"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button className={classes.colorGreen}>
            <HomeIcon color="primary" />
          </Button>
        </Box>
      </Link>
      <Link href="/movies">
        <Box
          component="a"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button className={classes.colorGreen}>
            <Typography variant="subtitle2">Movies</Typography>
          </Button>
        </Box>
      </Link>
      <Link href="/tv">
        <Box
          component="a"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button className={classes.colorGreen}>
            <Typography variant="subtitle2">TV Shows</Typography>
          </Button>
        </Box>
      </Link>

      {/* <MenuButton
        title="Movies"
        list={[
          { title: "Popular", redirect: "/movie/category/popular" },
          { title: "Now Playing", redirect: "/movie/category/now_playing" },
          { title: "Top Rated", redirect: "/movie/category/top_rated" },
          { title: "Latest", redirect: "/movie/category/latest" },
          { title: "Upcoming", redirect: "/movie/category/upcoming" },
        ]}
      />
      <MenuButton title="TV Shows" />
      <MenuButton title="People" /> */}
    </Box>
  );
}
