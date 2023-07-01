import { useEffect, useState } from "react";
import { getDataExternaly } from "../../Functions/DataExtraction";
import Page from "../../Components/Page";

export const getServerSideProps = async (context) => {
  const name = context.query.q;
  const acc_type_ = context.query.t || "subreddit";
  const isLinkFromHere = context.query?.lh;
  var res = getDataExternaly(name, acc_type_, "", isLinkFromHere);
  var data = await res.then((res) => res.data);

  return {
    props: {
      redData_: data,
      name,
      isLinkFromHere,
      acc_type_,
    },
  };
};

export default function SubRed({ redData_, name, isLinkFromHere, acc_type_ }) {
  const [redData, setredData] = useState(redData_);
  const [loading, setLoading] = useState(false);
  const [lastPostAfter, setlastPostAfter] = useState(redData.data.after);

  //useEffect for load more items
  useEffect(() => {
    setredData(redData);
    setLoading(false);
  }, [loading]);

  return (
    <Page
      redData={redData}
      name={name}
      acc_type={redData.acc_type || acc_type_}
      lastPostAfter={lastPostAfter}
      setlastPostAfter={setlastPostAfter}
      setredData={setredData}
      setLoading={setLoading}
      isLinkFromHere={isLinkFromHere}
    />
  );
}
