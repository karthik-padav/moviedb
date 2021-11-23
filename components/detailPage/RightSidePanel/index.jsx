import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import _isEmpty from "lodash/isEmpty";
import Keywords from "./Keywords";

const useStyles = makeStyles((theme) => ({}));

export default function RightSidePanel({ details, platform }) {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Keywords details={details} platform={platform} />
    </Box>
  );
}
