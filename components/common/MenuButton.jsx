import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  navButtom: {
    color: theme.palette.common.typographyColor.green,
  },
  dropdownMenu: {
    backgroundColor: theme.palette.common.black,
  },
}));

export default function MenuButton(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { title = "", list = [] } = props;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.navButtom}
      >
        <Typography variant="subtitle2">{title}</Typography>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        // className={classes.dropdownMenu}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {list.map((item, index) => (
          <Link href={item.redirect ? item.redirect : "/"}>
              <MenuItem onClick={handleClose}>{item.title}</MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
