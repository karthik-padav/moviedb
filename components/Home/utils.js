export const getTrendingFilters = () => {
  const payload = [
    {
      title: "All",
      component: <h1>All</h1>,
    },
    {
      title: "Movie",
      component: <h1>Movie 1</h1>,
    },
    {
      title: "TV Shows",
      component: <h1>TV Shows</h1>,
    },
  ];
  return payload;
};
