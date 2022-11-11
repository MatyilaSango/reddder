import React from 'react'
import NarvBar from './NarvBar'
import styles from '/styles/Home.module.css'

export default function Layout( {children} ) {
  return (
    <div className={styles.layout}>
      <NarvBar />
      {children}
    </div>
  )
}
