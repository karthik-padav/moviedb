import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
// import DirectionsIcon from "@material-ui/icons/Directions";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
// import Grid from "@material-ui/core/Grid";
import { getSortByList } from "./utils";
import _find from "lodash/find";
// import TextField from "@material-ui/core/TextField";
import Release from "./Filters/Release";
import Genres from "./Filters/Genres";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters, getFilters } from "redux/slices/discover";
import _isEmpty from "lodash/isEmpty";
import SearchWrapper from "components/common/SearchWrapper";

const useStyles = makeStyles((theme) => ({
  searchWrapper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
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

const sortLists = getSortByList();

export default function FiltersWrapper(props) {
  const selectedFIlters = useSelector(getFilters);
  const dispatch = useDispatch();
  const {
    genreList,
    platform,
    onSearch = () => {},
    onKeywordSearch = () => {},
  } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const filterListComponent = [
    {
      id: "panel1",
      title: "Sort",
      bodyComponents: [
        {
          detailsComponent: (
            <>
              <Typography variant="subtitle1">Sort Results By</Typography>
              <FormControl fullWidth>
                <Select
                  value={selectedFIlters.sort_by}
                  onChange={(e) => {
                    dispatch(
                      updateFilters({ key: "sort_by", value: e.target.value })
                    );
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {sortLists.map((item, index) => (
                    <MenuItem key={index} value={item.code}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ),
        },
      ],
    },
    {
      id: "panel2",
      title: "Filter",
      bodyComponents: [
        // { detailsComponent: <Release /> },
        { detailsComponent: genreList ? <Genres list={genreList} /> : null },
      ],
    },
  ];

  return (
    <>
      <Box mb={1}>
        <SearchWrapper onKeywordSearch={onKeywordSearch} onSearch={onSearch} />
      </Box>
      {filterListComponent.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === item.id}
          onChange={handleChange(item.id)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}bh-content`}
            id={`${item.id}bh-header`}
          >
            <Typography variant="body2">
              <b>{item.title}</b>
            </Typography>
          </AccordionSummary>
          <Divider />
          <AccordionDetails>
            {item.bodyComponents.map((sItem, index) => (
              <Box key={index} mb={item.bodyComponents.length > 1 ? 2 : 0}>
                {sItem.detailsComponent}
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Button variant="contained" color="primary" fullWidth onClick={onSearch}>
        <Box component="span" p={0.2}>
          <Typography variant="button">Search</Typography>
        </Box>
      </Button>
    </>
  );
}
