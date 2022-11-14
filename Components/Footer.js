import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../styles/Home.module.css";

export default function Footer() {
  const router = useRouter();

  const toContact = () => {
    router.push("/Contact");
  };

  return (
    <div className={styles.footerContainer}>
      <Link
        href="https://www.freeprivacypolicy.com/live/4d169eb0-07ab-4566-b202-5e926814f007"
        className={styles.ptLink}
      >
        Privacy Policy
      </Link>
      <Link
        href="https://www.freeprivacypolicy.com/live/ee19918e-249d-4efd-be09-aed0d5fe4933"
        className={styles.ptLink}
      >
        Terms and Conditions
      </Link>
      <p onClick={toContact} className={styles.ptLink}>
        Contact us
      </p>
      <br />
      <p className={styles.disclaimer}>
        Reddder does not store any files on our server, we only linked to the
        media which is hosted on Reddit.
      </p>
    </div>
  );
}
