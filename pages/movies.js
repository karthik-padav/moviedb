import styles from "styles/Home.module.css";
import Layout from "components/layout/Layout";
import Discover from "components/Discover";
import { getList } from "js/Api";
import { getSortByList } from "components/Discover/utils";
import _find from "lodash/find";
import { NextSeo } from "next-seo";
import { getSeoDetails } from "js/getSEO";

const sortLists = getSortByList();
const defaultSort = _find(sortLists, { default: true }).code;

export default function Index(props) {
  const {
    discoverList = [],
    genreList = [],
    SEO = { ...getSeoDetails() },
  } = props;
  return (
    <>
      <NextSeo {...SEO} />
      <Discover
        platform="movie"
        initialList={discoverList}
        genreList={genreList}
      />
    </>
  );
}

Index.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps() {
  const genreList = await getList({ path: "/genre/movie/list" });
  const discoverList = await getList({
    path: "/discover/movie",
    querry: `&page=1&${defaultSort}`,
  });

  return {
    props: {
      discoverList: discoverList?.data,
      genreList: genreList?.data?.genres,
    },
    revalidate: 86400,
  };
}
