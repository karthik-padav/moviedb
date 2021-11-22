import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Box } from "@material-ui/core";
import _get from "lodash/get";
import { Typography } from "@material-ui/core";
import GridListWrapper from "components/common/GridList";
import ImageListItem from "@material-ui/core/ImageListItem";
import Link from "next/link";
import ProfileCardLayout from "components/common/ProfileCardLayout";
import ProfileCardLayoutLoader from "components/common/ProfileCardLayout/ProfileCardLayoutLoader";
import { useEffect, useState } from "react";
import { getList } from "js/Api";

const useStyles = makeStyles((theme) => ({
  displayBlock: { display: "block" },
}));

export default function Cast({ platform, details }) {
  const [creditsList, setCredits] = useState({ loader: false, credits: null });

  /** Credits */
  const getCredits = async () => {
    setCredits({ loader: true, credits: null });
    const credits = await getList({
      path: `/${platform}/${details.id}/credits`,
    });
    setCredits({ loader: false, credits: credits?.data });
  };

  useEffect(() => {
    getCredits();
  }, []);
  const { credits, loader } = creditsList;
  const classes = useStyles();

  return (
    <Container>
      <Typography variant="h6">
        <b>Series Cast</b>
      </Typography>
      <Box my={2}>
        <GridListWrapper>
          {loader &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <ImageListItem key={item}>
                <ProfileCardLayoutLoader />
              </ImageListItem>
            ))}
          {!loader &&
            credits?.cast?.map((item, index) => (
              <ImageListItem key={index}>
                <a className={classes.displayBlock}>
                  <ProfileCardLayout item={item} />
                </a>
              </ImageListItem>
            ))}
        </GridListWrapper>
      </Box>
    </Container>
  );
}
