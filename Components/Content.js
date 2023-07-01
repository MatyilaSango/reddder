import React from "react";
import { getMediaLink, getMedia } from "../Functions/Media";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import like from "../images/Like.png";
import source from "../images/source.png";

export default function Content({ child }) {
  return (
    <div className={styles.contentDiv}>
      <a
        href={`/Preview?l=${getMediaLink(child.data)}&t=${child.data.title}&a=${
          child.data.author
        }&u=${child.data.ups}&s=${
          "https://www.reddit.com/" + child.data.permalink
        }`}
      >
        {getMedia(child.data)}
      </a>

      <div className={styles.contentBottomFlowDiv}>
        <div className={styles.picTitle}>
          <div className={styles.srcPic}>
            <a
              href={"https://www.reddit.com/" + child.data.permalink}
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
  );
}
