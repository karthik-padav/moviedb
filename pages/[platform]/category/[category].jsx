import Layout from "components/layout/Layout";
import { getList } from "js/Api";
import Container from "@material-ui/core/Container";
import { Box, Grid, Paper } from "@material-ui/core";
import _get from "lodash/get";
import CardLayout from "components/common/CardLayout/CardLayout";
import { NextSeo } from "next-seo";
import { getSeoDetails } from "js/getSEO";

export default function Category(props) {
  const { list, params, SEO = { ...getSeoDetails() } } = props;

  return (
    <Container>
      <NextSeo {...SEO} />
      <h1>{params}</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
            <Box p={1}>Filter</Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper>
            <Box p={2}>
              <Grid container spacing={2}>
                {_get(list, "results", []).map((item, index) => (
                  <Grid item md={3} key={index}>
                    <Box>
                      <CardLayout item={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

Category.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ params, querry }) {
  let list = [];
  if (params?.category)
    list = await getList({ path: `/movie/${params.category}` });
  return { props: { params: params.category, list: list?.data } };
}
