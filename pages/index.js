import styles from "styles/Home.module.css";
import Layout from "components/layout/Layout";
import Home from "components/Home";
import { getList } from "js/Api";
import { NextSeo } from "next-seo";
import { getSeoDetails } from "js/getSEO";

export default function Index(props) {
  const {
    movieTrendingList,
    tvTrendingList,
    populatMovieList,
    populatTvList,
    topRatedTvList,
    topRatedMovieList,
    nowPlayingMovieList,
    onAirTvList,
    SEO = { ...getSeoDetails() },
  } = props;
  console.log(props, "props123");
  return (
    <>
      <NextSeo {...SEO} />
      <Home
        movieTrendingList={movieTrendingList}
        tvTrendingList={tvTrendingList}
        populatMovieList={populatMovieList}
        populatTvList={populatTvList}
        topRatedMovieList={topRatedMovieList}
        topRatedTvList={topRatedTvList}
        nowPlayingMovieList={nowPlayingMovieList}
        onAirTvList={onAirTvList}
      />
    </>
  );
}

Index.getLayout = (page) => <Layout>{page}</Layout>;

export async function getStaticProps({ preview = false }) {
  const movieTrendingList = await getList({ path: "/trending/movie/week" });
  const tvTrendingList = await getList({ path: "/trending/tv/week" });

  const topRatedMovieList = await getList({ path: "/movie/top_rated" });
  const topRatedTvList = await getList({ path: "/tv/top_rated" });

  const populatMovieList = await getList({ path: "/movie/popular" });
  const populatTvList = await getList({ path: "/tv/popular" });

  const nowPlayingMovieList = await getList({ path: "/movie/now_playing" });
  const onAirTvList = await getList({ path: "/tv/on_the_air" });

  return {
    props: {
      movieTrendingList: movieTrendingList?.data,
      tvTrendingList: tvTrendingList?.data,
      populatMovieList: populatMovieList?.data,
      populatTvList: populatTvList?.data,
      topRatedMovieList: topRatedMovieList?.data,
      topRatedTvList: topRatedTvList?.data,
      nowPlayingMovieList: nowPlayingMovieList?.data,
      onAirTvList: onAirTvList?.data,
    },
    revalidate: 86400,
  };
}
