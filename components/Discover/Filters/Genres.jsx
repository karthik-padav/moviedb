import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import _find from "lodash/find";
import _get from "lodash/get";
import _findIndex from "lodash/findIndex";
import _cloneDeep from "lodash/cloneDeep";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import { updateFilters, getFilters } from "redux/slices/discover";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({}));

export default function Genres(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedFIlters = useSelector(getFilters);
  const { list = [] } = props;
  let filterGeneres = _cloneDeep(_get(selectedFIlters, "with_genres", []));

  const handleClick = (item) => {
    let newList = [];
    const index = filterGeneres.indexOf(item.id);
    if (index < 0) {
      filterGeneres.push(item.id);
      newList = filterGeneres;
    } else
      newList = filterGeneres.filter((f) => {
        return f !== item.id;
      });
    dispatch(updateFilters({ key: "with_genres", value: newList }));
  };

  return (
    <>
      <Typography variant="body2">Genres</Typography>
      <Box display="flex" flexWrap="wrap">
        {list.map((item, index) => (
          <Box mt={0.7} mr={0.5} key={index}>
            <Chip
              label={<Typography variant="caption">{item.name}</Typography>}
              color={filterGeneres.includes(item.id) ? "primary" : "default"}
              onClick={() => handleClick(item)}
              size="small"
            />
          </Box>
        ))}
      </Box>
    </>
  );
}
