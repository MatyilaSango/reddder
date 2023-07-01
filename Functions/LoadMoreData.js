import { getDataExternaly } from "./DataExtraction";

export const loadMoreData = async ({
  name,
  acc_type,
  lastPostAfter,
  setlastPostAfter,
  setredData,
  setLoading,
  redData,
  isLinkFromHere,
}) => {
  if (lastPostAfter != null) {
    var res = getDataExternaly(name, acc_type, lastPostAfter, isLinkFromHere);
    var newdata = await res.then((res) => res.data);

    newdata.data.children.map((c) => {
      redData.data.children.push(c);
    });

    setlastPostAfter(newdata.data.after);
    redData.data.after = newdata.data.after;
    redData.data.dist += newdata.data.dist;
    setredData(redData);
    setLoading(true);
  }
};
