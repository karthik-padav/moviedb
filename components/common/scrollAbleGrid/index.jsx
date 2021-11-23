import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import GridListWrapper from "components/common/GridList";
import Chip from "@material-ui/core/Chip";
import { useState } from "react";
import CardLayout from "components/common/CardLayout/CardLayout";
import ImageListItem from "@material-ui/core/ImageListItem";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  displayBlock: {
    display: "block",
  },
}));

export default function ScrollAbleGrid(props) {
  const { data = [], title = "" } = props;

  const classes = useStyles();
  const [selectedList, setSelectedList] = useState(data[0]);
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box mr={2}>{title}</Box>
        {data.map((item, index) => (
          <Box mx={0.5} key={index}>
            <Chip
              label={item.title}
              clickable
              color="primary"
              color="primary"
              onClick={() => setSelectedList(item)}
              variant={selectedList?.id === item.id ? "default" : "outlined"}
            />
          </Box>
        ))}
      </Box>
      <Box my={2}>
        <GridListWrapper md={7.5} sm={2.5} xs={2.5}>
          {selectedList?.data?.map((item, index) => (
            <ImageListItem key={index}>
              <Link href={`${selectedList?.category}/${item.id}`}>
                <a className={classes.displayBlock}>
                  <CardLayout item={item} />
                </a>
              </Link>
            </ImageListItem>
          ))}
        </GridListWrapper>
      </Box>
    </>
  );
}
