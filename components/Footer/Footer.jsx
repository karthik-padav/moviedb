import React from "react";
import Head from "next/head";
import Image from "next/image";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { grey, red, blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    backgroundColor: "#1f2937",
    color: grey[300],
  },
  listWrapper: {
    listStyle: "none",
  },
}));

const menuList = [
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "About", href: "/about" },
];

export default function Footer(props) {
  const classes = useStyles();
  return (
    <Box className={classes.footerWrapper} py={2} component="footer">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Box
              component="ul"
              p={0}
              m={0}
              display="flex"
              justifyContent="center"
              className={classes.listWrapper}
            >
              {menuList.map((item, index) => (
                <Box component="li" px={1} mb={1} key={index}>
                  <Link href={item.href}>{item.title}</Link>
                </Box>
              ))}
            </Box>

            <Box mb={1}>
              <Typography variant="caption" component="p" align="center">
                <b>Copyright © 2021. All rights reserved.</b>
              </Typography>
            </Box>

            <Box mb={1}>
              <Typography variant="caption" component="p" align="center">
                <b>Made with ❤️</b>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
