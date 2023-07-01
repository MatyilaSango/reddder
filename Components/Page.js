import React from 'react'
import { loadMoreData } from '../Functions/LoadMoreData'
import LoadMore from './LoadMore'
import BodyContainer from './BodyContainer'
import styles from "../styles/Home.module.css";
import Head from 'next/head';

export default function Page({redData, name, acc_type, lastPostAfter, setlastPostAfter, setredData, setLoading, isLinkFromHere}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{name}</title>
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

      <BodyContainer redData={redData} name={name} />
      <LoadMore
          name={name}
          acc_type={acc_type}
          lastPostAfter={lastPostAfter}
          setlastPostAfter={setlastPostAfter}
          setredData={setredData}
          setLoading={setLoading}
          redData={redData}
          isLinkFromHere={isLinkFromHere}
      />
    </div>
  )
}
