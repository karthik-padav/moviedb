import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
import _isEmpty from "lodash/isEmpty";
import { Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { useEffect, useState } from "react";
import { getList } from "js/Api";
import Skeleton from "@material-ui/lab/Skeleton";

export default function Keywords({ details, platform }) {
  const [keywordObj, setKeywords] = useState({
    loader: false,
    keywords: null,
  });

  /** Keywords */
  const getKeywords = async () => {
    setKeywords({ loader: true, keywords: null });
    let obj = {};
    const keywords = await getList({
      path: `/${platform}/${details.id}/keywords`,
    });
    if (keywords?.data) obj = { ...keywords?.data };
    obj.loader = false;
    setKeywords(obj);
  };

  useEffect(() => {
    getKeywords();
  }, []);

  const { loader } = keywordObj;
  const keywords = keywordObj?.keywords || keywordObj?.results;
  return (
    <Paper>
      <Box p={2}>
        <Typography variant="h6">
          <b>Keywords</b>
        </Typography>
        {loader && (
          <Box display="flex" flexWrap="wrap">
            {[1, 2, 3, 4, 5, 3, 2, 1, 2].map((item, index) => (
              <Box key={index} mr={0.5}>
                <Skeleton
                  variant="text"
                  width={`${item * 20}px`}
                  height="30px"
                />
              </Box>
            ))}
          </Box>
        )}
        <Box display="flex" flexWrap="wrap">
          {!_isEmpty(keywords) &&
            !loader &&
            keywords.map((item, index) => (
              <Box key={index} mt={0.7} mr={0.5}>
                <Chip
                  color="primary"
                  label={<Typography variant="caption">{item.name}</Typography>}
                  size="small"
                />
              </Box>
            ))}
        </Box>
      </Box>
    </Paper>
  );
}
