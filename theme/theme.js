import { createTheme } from "@material-ui/core/styles";
import { grey, red, blue, lime, orange, green } from "@material-ui/core/colors";
import colors from "theme/ThemeColors";
import constants from "js/Constants";

export const defaultTheme = (theme) => {
  const isDark = theme === constants.THEME.DARK;
  return {
    typography: {
      fontFamily: "BrighterSansRegular",
      // h1: {
      //   fontSize: 30,
      // },
      // h2: {
      //   fontSize: 20,
      // },
      // h3: {
      //   fontSize: 18,
      // },
      // h4: {
      //   fontSize: 16,
      // },
      // h5: {
      //   fontSize: 14,
      // },
      // h6: {
      //   fontSize: 12,
      // },
      // subtitle1: {
      //   fontSize: 14,
      //   fontWeight: 400,
      // },
      // subtitle2: {
      //   fontSize: 14,
      //   fontWeight: 800,
      // },
      // body2: {
      //   fontSize: 14,
      // },
      // button: {
      //   fontSize: 11,
      //   letterSpacing: "1px",
      // },
    },

    overrides: {
      MuiAccordionDetails: { root: { display: "block" } },
      MuiListItemIcon: {
        root: { minWidth: "auto", marginRight: "10px" },
      },
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: isDark ? "rgba(255, 255, 255, 0.1)" : grey[100],
          },
        },
      },
      MuiList: { padding: { paddingTop: 0, paddingBottom: 0 } },

      MuiPaper: {
        elevation1: {
          boxShadow:
            "0px 0px 2px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        },
      },

      MuiAppBar: { backgroundColor: grey[100] },

      // MuiChip: {
      //   clickable: {
      //     "&:active": {
      //       backgroundColor: green[500],
      //       color: colors.white,
      //     },
      //     "&:hover": {
      //       backgroundColor: green[500],
      //       color: colors.white,
      //     },
      //   },
      // },

      MuiCssBaseline: {
        "@global": {
          "*::-webkit-scrollbar": {
            width: "0.4em",
            height: "0.4em",
          },
          "*::-webkit-scrollbar-track": {
            "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: blue[100],
            outline: "1px solid slategrey",
            borderRadius: "50px",
          },
        },
      },
    },
  };
};

export const getTheme = (theme) => {
  const isDark = theme === constants.THEME.DARK;
  return createTheme({
    ...defaultTheme(theme),
    palette: {
      common: {
        typographyColor: {
          green: green[500],
          white: colors.white,
          black: colors.black,
        },
        chip: {
          green: green[500],
          white: colors.white,
        },
        black: colors.black,
        blackOpacity: colors.blackOpacity,
      },
      primary: {
        main: colors.green,
      },
      // secondary: {
      //   main: "#f44336",
      // },
      //   type: theme,
      //   // action: {
      //   //   active: isDark ? "rgba(255, 255, 255, 0.7)" : colors.green,
      //   //   hover: isDark ? "rgba(255, 255, 255, 0.08)" : grey[200],
      //   //   // selected: isDark ? "rgba(255, 255, 255, 0.7)" : grey[200],
      //   //   hoverOpacity: 0.1,
      //   //   selectedOpacity: 0.1,
      //   // },
      //   // text: {
      //   //   primary: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.87)",
      //   // },
      //   // background: {
      //   //   paper: isDark ? "#424242" : "#fff",
      //   //   body: isDark ? "#212121" : "#fff",
      //   //   default: isDark ? grey[800] : "#fff",
      //   // },
      //   common: {
      //     loader: orange[500],
      //     button: {
      //       bgColor: colors.green,
      //       color: "#fff",
      //     },
      //     IconButton: {
      //       bgColor: `rgb(227 242 253 / ${isDark ? "10%" : "40%"})`,
      //       color: colors.green,
      //     },
      //     tabs: {
      //       bgColor: isDark ? `rgb(227 242 253 / 10%)` : colors.green,
      //       color: isDark ? colors.green : "#fff",
      //     },
      //     navBar: { bgColor: colors.black, color: colors.green },
      //     gray: grey[300],
      //     gray_100: grey[100],
      //     red_500: red[500],
      //   },
    },
  });
};
