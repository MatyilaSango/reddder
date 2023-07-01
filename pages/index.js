import { useState, useEffect } from "react";
import Page from "../Components/Page";
import { getDataExternaly } from "../Functions/DataExtraction";

export const getStaticProps = async () => {
  const res = getDataExternaly("Popular", "subreddit", "", "no");
  const data = await res.then((res) => res.data);

  return {
    props: {
      redData_: data,
    },
    revalidate: 10,
  };
};

export default function Home({ redData_ }) {
  const [redData, setredData] = useState(redData_);
  const [loading, setLoading] = useState(false);
  const [lastPostAfter, setlastPostAfter] = useState(redData.data.after);
  const [acc_type, setacc_type] = useState("subreddit");

  useEffect(() => {
    setredData(redData);
    setLoading(false);
  }, [loading]);

  return (
    <Page
      redData={redData}
      name="Popular"
      acc_type={acc_type}
      lastPostAfter={lastPostAfter}
      setlastPostAfter={setlastPostAfter}
      setredData={setredData}
      setLoading={setLoading}
    />
  );
}
