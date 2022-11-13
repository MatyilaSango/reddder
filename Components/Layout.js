import React from 'react'
import Footer from './Footer'
import NarvBar from './NarvBar'
import styles from '/styles/Home.module.css'

export default function Layout( {children} ) {
  return (
    <div className={styles.layout}>
      <NarvBar />
      {children}
      <Footer />
    </div>
  )
}
