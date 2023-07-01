import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Down from "../images/Down.png";
import { loadMoreData } from "../Functions/LoadMoreData";

export default function LoadMore({
  name,
  acc_type,
  lastPostAfter,
  setlastPostAfter,
  setredData,
  setLoading,
  redData,
  isLinkFromHere,
}) {
  return (
    <div className={styles.loadMoreContainer}>
      <Image
        src={Down}
        className={styles.loadMoreButton}
        alt="pic"
        width={40}
        onClick={() =>
          loadMoreData({
            name,
            acc_type,
            lastPostAfter,
            setlastPostAfter,
            setredData,
            setLoading,
            redData,
            isLinkFromHere,
          })
        }
      />
    </div>
  );
}
