import constants from "js/Constants";
const site_name = constants.SITE_TITLE;
const title = constants.SITE_TITLE;
const description = "Watch Movie Online | Watch Web Series Online";

export default {
  title,
  description,
  canonical: constants.SITE_URL,
  additionalMetaTags: [],
  openGraph: {
    url: constants.SITE_URL,
    title,
    description,
    site_name,
  },
  // twitter: {
  //   handle: "@handle",
  //   site: "@site",
  //   cardType: "summary_large_image",
  // },
};
