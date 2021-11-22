import Layout from "components/layout/Layout";
import { getList } from "js/Api";
import _get from "lodash/get";
import DetailPage from "components/detailPage";
import { NextSeo } from "next-seo";
import { getSeoDetails } from "js/getSEO";

export default function Movie(props) {
  const { details, platform, SEO = { ...getSeoDetails() } } = props;

  if (!details) return null;

  return (
    <>
      <NextSeo {...SEO} />
      <DetailPage details={details} platform={platform} />
    </>
  );
}

Movie.getLayout = (page) => <Layout>{page}</Layout>;

export async function getServerSideProps({ params, querry }) {
  try {
    let resp = {};

    if (params?.id && params?.platform)
      resp = await getList({ path: `/${params.platform}/${params.id}` });

    return {
      props: {
        details: resp?.data,
        platform: params.platform,
        SEO: getSeoDetails({
          title: `${
            resp?.data?.title ||
            resp?.data?.original_title ||
            resp?.data?.name ||
            resp?.data?.original_name
          } | Watch ${params?.platform || ""} Online`,
          description: `${resp?.data?.overview} | Watch ${
            params?.platform || ""
          } Online`,
        }),
      },
    };
  } catch {
    return { notFound: true };
  }
}
