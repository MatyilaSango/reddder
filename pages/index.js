import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import like from "../images/Like.png";
import source from "../images/source.png";
import Down from "../images/Down.png";
import { isMedia, getMedia, getMediaLink } from "../Functions/Media";
import { useState, useEffect } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://www.reddit.com/r/popular.json?limit=25");
  const data = await res.json();

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

  const loadMoreData = async () => {
    const res = await fetch(
      `https://www.reddit.com/r/popular.json?limit=25&after=${redData.data.after}`
    );
    var newdata = await res.json();

    newdata.data.children.map((c) => {
      setredData(redData.data.children.push(c));
    });

    redData.data.after = newdata.data.after;
    redData.data.dist += newdata.data.dist;
    setredData(redData);

    setLoading(true);
  };

  useEffect(() => {
    setredData(redData);
    setLoading(false);
  }, [loading]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Explore popular videos and pictures."
        />
        <meta property="og:site_name" content="Reddder" />
        <meta property="og:url" content="https://reddder.vercel.app/" />
        <meta property="og:title" content="Reddder" />
        <meta property="og:image" content="/Reddder.png" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <link rel="icon" href="/Reddder.png" type="png" />
      </Head>

      <div className={styles.bodyContainer}>
        <p>Popular:</p>
        {typeof redData.data.children[0] === "undefined" ? (
          <p>Enter a subreddit!!!</p>
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
                        "https://www.reddit.com" + child.data.permalink
                      }`}
                    >
                      {getMedia(child.data)}
                    </a>

                    <div className={styles.contentBottomFlowDiv}>
                      <div className={styles.picTitle}>
                        <div className={styles.srcPic}>
                          <a
                            href={
                              "https://www.reddit.com" + child.data.permalink
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
                          {child.data.title}
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
