import axios from "axios";

export async function getDataExt(_username, acc_type, lastPostAfter) {
  return await axios.get(
    lastPostAfter !== "" || lastPostAfter !== null
      ? `https://www.reddit.com/${acc_type}/${_username}.json?limit=10&after=${lastPostAfter}`
      : `https://www.reddit.com/${acc_type}/${_username}.json?limit=10`
    // {
    //   headers: {
    //     "Clear-Site-Data": "cache",
    //   },
    // }
  );
}

export async function getDataExternaly(
  _username,
  acc_type,
  lastPostAfter,
  isLinkFromHere
) {
  if (acc_type === "subreddit") acc_type = "r";
  if (acc_type === (undefined || null || "")) acc_type = "r";

  if (isLinkFromHere === "true") {
    let newdata = getDataExt(_username, acc_type, lastPostAfter);
    let newdataRes = await newdata.then((res) => res.data);

    if (
      newdataRes.data?.error === 404 ||
      newdataRes.data?.children.length === 0
    ) {
      newdata = await getDataExt(_username, "user", lastPostAfter);
      acc_type = "user"
    }
    (await newdata).data["acc_type"] = acc_type
    return await newdata;
  }

  try {
    return getDataExt(_username, acc_type, lastPostAfter);
  } catch (AxiosError) {
    alert(
      `No such account ${_username} found with type ${acc_type}! ${lastPostAfter}`
    );
  }
}
