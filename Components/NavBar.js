import styles from "../styles/Home.module.css";
import Image from "next/image";
import redder from "../images/Reddder.png";
import search from "../images/Search.png";
import { React, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function NarvBar() {
  const router = useRouter();
  const pleaseWaitRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);

  const searchHandler = async (e) => {
    e.preventDefault();

    console.log(e.currentTarget.elements)
    if (!e.currentTarget.elements[1].name) return;
    const param = e.currentTarget.elements[1].value;
    const acc_type = e.currentTarget.elements[0].value

    setIsLoading(true);

    await router.push(`/Search/?q=${param}&t=${acc_type}`);
    router.reload();
  };

  const toHome = () => {
    router.push("/");
  };

  useEffect(() => {
    pleaseWaitRef.current = "Please wait...";
  }, [isLoading]);

  return (
    <div className={styles.narvBar}>
      <Image
        className={styles.logo}
        src={redder}
        alt="Reddder"
        height={40}
        onClick={toHome}
      />
      <div className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={searchHandler}>
          <select className={styles.searchFormSelect}  name="acc_type" id="acc_type">
            <option className={styles.searchFormSelectOption} value="subreddit">Subreddit</option>
            <option className={styles.searchFormSelectOption} value="user">User</option>
          </select>
          <input
            className={styles.searchInput}
            type="text"
            name="r"
            placeholder="Search..."
            required
          />
          <button className={styles.searchButton} type="submit">
            <Image src={search} alt="search" width={20} />
          </button>
        </form>
        <label className={styles.pleaseWaitLableText}>
          {pleaseWaitRef.current}
        </label>
        <div className={styles.searchItemsContainer}>
          <div className={styles.searchItem}>abcdefg</div>
        </div>
      </div>
    </div>
  );
}
