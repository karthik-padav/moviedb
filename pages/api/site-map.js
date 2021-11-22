import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { getList } from "js/Api";

const generateURL = () => {};

export default async (req, res) => {
  let links = [
    {
      url: `/`,
      changefreq: "daily",
      priority: 0.3,
    },
    {
      url: `/privacy-policy`,
      changefreq: "daily",
      priority: 0.3,
    },
    {
      url: `/movies`,
      changefreq: "daily",
      priority: 0.3,
    },
    {
      url: `/tv`,
      changefreq: "daily",
      priority: 0.3,
    },
  ];

  const movieTrendingList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/trending/movie/week" });
    if (resp?.data) resolve({ ...resp.data, category: "movie" });
    else reject();
  });
  const tvTrendingList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/trending/tv/week" });
    if (resp?.data) resolve({ ...resp.data, category: "tv" });
    else reject();
  });

  const topRatedMovieList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/movie/top_rated" });
    if (resp?.data) resolve({ ...resp.data, category: "movie" });
    else reject();
  });
  const topRatedTvList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/tv/top_rated" });
    if (resp?.data) resolve({ ...resp.data, category: "tv" });
    else reject();
  });

  const populatMovieList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/movie/popular" });
    if (resp?.data) resolve({ ...resp.data, category: "movie" });
    else reject();
  });
  const populatTvList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/tv/popular" });
    if (resp?.data) resolve({ ...resp.data, category: "tv" });
    else reject();
  });

  const nowPlayingMovieList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/movie/now_playing" });
    if (resp?.data) resolve({ ...resp.data, category: "movie" });
    else reject();
  });
  const onAirTvList = new Promise(async (resolve, reject) => {
    let resp = await getList({ path: "/tv/on_the_air" });
    if (resp?.data) resolve({ ...resp.data, category: "tv" });
    else reject();
  });

  Promise.all([
    movieTrendingList,
    tvTrendingList,
    topRatedMovieList,
    topRatedTvList,
    populatMovieList,
    populatTvList,
    nowPlayingMovieList,
    onAirTvList,
  ])
    .then(async (values) => {
      for (const val of values) {
        for (const list of val?.results || []) {
          links.push({
            url: `/${val.category}/${list?.id}`,
            changefreq: "daily",
            priority: 0.3,
          });
        }
      }

      const stream = new SitemapStream({
        hostname: `http://${req.headers.host}`,
      });
      res.writeHead(200, { "Content-Type": "application/xml" });
      const xmlString = await streamToPromise(
        Readable.from(links).pipe(stream)
      ).then((data) => data.toString());
      res.end(xmlString);
    })
    .catch(async () => {
      const stream = new SitemapStream({
        hostname: `http://${req.headers.host}`,
      });
      res.writeHead(200, { "Content-Type": "application/xml" });
      const xmlString = await streamToPromise(
        Readable.from(links).pipe(stream)
      ).then((data) => data.toString());
      res.end(xmlString);
    });
};
