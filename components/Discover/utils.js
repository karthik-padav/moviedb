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

export const getSortByList = () => {
  return [
    { name: "Popularity Descending", code: "popularity.desc", default: true },
    { name: "Popularity Ascending", code: "popularity.asc" },
    { name: "Rating Descending", code: "vote_average.desc" },
    { name: "Rating Ascending", code: "vote_average.asc" },
    { name: "Release Date Descending", code: "release_date.desc" },
    { name: "Release Date Ascending", code: "release_date.asc" },
    { name: "Revenue Descending", code: "revenue.desc" },
    { name: "Revenue Ascending", code: "revenue.asc" },
    { name: "Title [A-Z]", code: "original_title.asc" },
    { name: "Title [Z-A]", code: "original_title.desc" },
  ];
};
