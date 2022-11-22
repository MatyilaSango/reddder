import React from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import styles from "/styles/Home.module.css";

export default function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
