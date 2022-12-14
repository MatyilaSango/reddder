import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import like from "../../images/Like.png";
import source from "../../images/source.png";
import Down from "../../images/Down.png";
import { isMedia, getMediaLink, getMedia } from "../../Functions/Media";
import { useEffect, useState } from "react";

export const getServerSideProps = async (context) => {
  const name = context.query.q;
  const res = await fetch(`https://www.reddit.com/r/${name}.json?limit=25`);
  var data = await res.json();
  data =
    data.data.dist !== 0
      ? data
      : await fetch(`https://www.reddit.com/user/${name}.json?limit=25`).then(
          (res) => (data = res.json())
        );

  return {
    props: {
      redData_: data,
      name,
    },
  };
};

export default function SubRed({ redData_, name }) {
  const [redData, setredData] = useState(redData_);
  const [loading, setLoading] = useState(false);

  const loadMoreData = async () => {
    const res = await fetch(
      `https://www.reddit.com/user/${name}.json?limit=25&after=${redData.data.after}`
    );
    var newdata = await res.json();
    newdata =
      newdata.error !== 403
        ? newdata
        : await fetch(
            `https://www.reddit.com/r/${name}.json?limit=25&after=${redData.data.after}`
          );

    try {
      newdata = await newdata.json();
    } catch {}

    newdata.data.children.map((c) => {
      setredData(redData.data.children.push(c));
    });

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
                          <a href={`/Search?q=${child.data.author}`}>
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
