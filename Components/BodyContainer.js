import React from "react";
import Content from "./Content";
import { isMedia } from "../Functions/Media";
import styles from "../styles/Home.module.css";

export default function BodyContainer({ redData, name }) {
  return (
    <div className={styles.bodyContainer}>
      <p>{name} :</p>
      {redData.error === 404 ||
      typeof redData.data.children[0] === "undefined" ? (
        <p>Enter a correct subreddit or username !!!</p>
      ) : (
        <div className={styles.contentContainer}>
          {redData.data.children.map(
            (child) => isMedia(child.data.url) && <Content child={child} />
          )}
        </div>
      )}
    </div>
  );
}
