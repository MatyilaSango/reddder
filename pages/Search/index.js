import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import like from "../../images/Like.png";
import source from "../../images/source.png";
import Down from "../../images/Down.png";
import { isMedia, getMediaLink, getMedia } from "../../Functions/Media";
import { useEffect, useState } from "react";
import axios from "axios";

export async function getDataExt(_username, acc_type, lastPostAfter) {
  return await axios.get(
    lastPostAfter !== ""
      ? `https://www.reddit.com/${acc_type}/${_username}.json?limit=10&after=${lastPostAfter}`
      : `https://www.reddit.com/${acc_type}/${_username}.json?limit=10`,
    {
      headers: {
        "Clear-Site-Data": "cache",
      },
    }
  );
}

export async function getDataExternaly(
  _username,
  acc_type,
  lastPostAfter,
  isLinkFromHere
) {
  if (acc_type === "subreddit") acc_type = "r";

  if (isLinkFromHere === "true") {
    let newdata = getDataExt(_username, "r", "");
    let newdataRes = await newdata.then((res) => res.data);
    newdata =
      (await newdataRes.data.children.length) === 0
        ? getDataExt(_username, "user", "")
        : newdata;

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

export const getServerSideProps = async (context) => {
  const name = context.query.q;
  const isSubreddit = context.query.t;
  const isLinkFromHere = context.query?.lh;
  var res = getDataExternaly(name, isSubreddit, "", isLinkFromHere);
  var data = await res.then((res) => res.data);

  return {
    props: {
      redData_: data,
      name,
      isSubreddit,
    },
  };
};

export default function SubRed({ redData_, name, isSubreddit }) {
  const [redData, setredData] = useState(redData_);
  const [loading, setLoading] = useState(false);
  const [lastPostAfter, setlastPostAfter] = useState(redData.data.after);

  const loadMoreData = async () => {
    var res = getDataExternaly(name, isSubreddit, lastPostAfter);
    var newdata = await res.then((res) => res.data);

    newdata.data.children.map((c) => {
      setredData(redData.data.children.push(c));
    });

    setlastPostAfter(newdata.data.after);
    redData.data.after = newdata.data.after;
    redData.data.dist += newdata.data.dist;
    setredData(redData);

    setLoading(true);
  };

  //useEffect for load more items
  useEffect(() => {
    setredData(redData);
    setLoading(false);
  }, [loading]);

  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Search content." />
        <link rel="icon" href="/Reddder.png" type="png" />
      </Head>

      <div className={styles.bodyContainer}>
        <p>{name} :</p>
        {redData.error === 404 ||
        typeof redData.data.children[0] === "undefined" ? (
          <p>Enter a correct subreddit or username !!!</p>
        ) : (
          <div className={styles.contentContainer}>
            {redData.data.children.map(
              (child) =>
                isMedia(child.data.url) && (
                  <div className={styles.contentDiv}>
                    <a
                      href={`/Preview?l=${getMediaLink(child.data)}&t=${
                        child.data.title
                      }&a=${child.data.author}&u=${child.data.ups}&s=${
                        "https://www.reddit.com/" + child.data.permalink
                      }`}
                    >
                      {getMedia(child.data)}
                    </a>

                    <div className={styles.contentBottomFlowDiv}>
                      <div className={styles.picTitle}>
                        <div className={styles.srcPic}>
                          <a
                            href={
                              "https://www.reddit.com/" + child.data.permalink
                            }
                            target="_blank"
                          >
                            <Image src={source} alt="pic" width={40} />
                          </a>
                        </div>
                        <div className={styles.usernameText}>
                          <a href={`/Search?q=${child.data.author}&lh=true`}>
                            @{child.data.author}
                          </a>
                        </div>
                        <div className={styles.srcTitle}>
                          <>{child.data.title}</>
                        </div>
                      </div>

                      <div className={styles.srcLikes}>
                        <Image src={like} alt="pic" width={25} />
                        <>{child.data.ups}</>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
      <div className={styles.loadMoreContainer}>
        <Image
          src={Down}
          className={styles.loadMoreButton}
          alt="pic"
          width={40}
          onClick={loadMoreData}
        />
      </div>
    </div>
  );
}
