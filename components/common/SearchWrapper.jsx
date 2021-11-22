import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import DirectionsIcon from "@material-ui/icons/Directions";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    borderRadius: theme.spacing(1),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function SearchWrapper({
  onKeywordSearch = () => {},
  onSearch = () => {},
}) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <Paper className={classes.searchWrapper}>
      <InputBase
        className={classes.input}
        placeholder="Search for Movies or TV Shows"
        inputProps={{ "aria-label": "Search for Movies or TV Shows" }}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={() => onKeywordSearch(value)}
      >
        <SearchIcon />
      </IconButton>
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={() => onSearch({})}
      >
        <RefreshIcon />
      </IconButton>
    </Paper>
  );
}
