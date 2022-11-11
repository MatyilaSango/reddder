import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Down from '../images/Down.png'

export default function LoadMore() {
  return (
    <div className={styles.loadMoreContainer}>
        <Image src={Down} className={styles.loadMoreButton} alt='pic' width={40}/>
    </div>
  )
}
