import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ScrollAbleGrid from "components/common/scrollAbleGrid";
import constants from "js/Constants";
import Container from "@material-ui/core/Container";
import colors from "theme/ThemeColors";
import CardLayout from "components/common/CardLayout/CardLayout";
import CardSkeleton from "components/common/CardLayout/CardSkeleton";
import { useState } from "react";
import _get from "lodash/get";
import FiltersWrapper from "./FiltersWrapper";
import { getList } from "js/Api";
import Link from "next/link";
import { resetFilters, getFilters } from "redux/slices/discover";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({}));

export default function Discover(props) {
  const { platform, genreList } = props;
  const dispatch = useDispatch();

  const selectedFIlters = useSelector(getFilters);
  const [list, setList] = useState(_get(props, "initialList.results", []));
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    props?.initialList?.total_pages || 1
  );
  const classes = useStyles();
  const pageTitle =
    platform === "movie" ? "Movies" : platform === "tv" ? "TV Shows" : "";

  const onSearch = async ({ page = 1 }) => {
    setCurrentPage(page);
    let querry = "";
    if (selectedFIlters) {
      for (const key of Object.keys(selectedFIlters)) {
        querry += `&${key}=${selectedFIlters[key]}`;
      }
      setLoader(true);
      const resp = await getList({
        path: `/discover/${platform}`,
        querry: `&page=${page}${querry}`,
      });
      setLoader(false);
      if (resp?.data?.results) {
        setList(resp.data.results);
        setTotalPages(resp?.data?.total_pages);
      }
    }
  };

  const onKeywordSearch = async (keyword) => {
    if (keyword) {
      setLoader(true);
      const resp = await getList({
        path: `/search/${platform}`,
        querry: `&page=1&query=${keyword}`,
      });
      setLoader(false);
      if (resp?.data?.results) setList(resp.data.results);
    }
  };

  useEffect(() => {
    dispatch(resetFilters({ key: "sort_by", value: "popularity.desc" }));
  }, []);

  return (
    <Container>
      <Box my={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={3}>
            <FiltersWrapper
              genreList={genreList}
              platform={platform}
              onSearch={onSearch}
              onKeywordSearch={onKeywordSearch}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9}>
            <Paper>
              <Box p={2} pb={0}>
                <Typography variant="h6" component="h1">
                  <b>{pageTitle}</b>
                </Typography>
              </Box>{" "}
              <Box p={2}>
                <Grid container spacing={2}>
                  {loader ? (
                    <>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Grid item md={3} sm={6} xs={6} key={i}>
                          <CardSkeleton />
                        </Grid>
                      ))}
                    </>
                  ) : (
                    <>
                      {list.map((item, index) => (
                        <Grid item md={3} sm={6} xs={6} key={index}>
                          <Box>
                            <Link href={`${platform}/${item.id}`}>
                              <a>
                                <CardLayout item={item} />
                              </a>
                            </Link>
                          </Box>
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
              </Box>
            </Paper>
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(event, value) => onSearch({ page: value })}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
