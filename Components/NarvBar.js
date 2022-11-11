import styles from '../styles/Home.module.css'
import { Container, SearchContainer } from '../styles/NavBarStyles'
import Image from 'next/image'
import redder from '../images/Reddder.png'
import search from '../images/Search.png'
import { React, useEffect } from 'react'
import { useRouter } from 'next/router'



export default function NarvBar() {
  const router = useRouter();

  const searchHandler = (e) => {
    e.preventDefault()
    if(!e.currentTarget.elements[0].name) return
    const param = e.currentTarget.elements[0].value

    router.push(`/Search/${param}`)
   
  };
  
  const toHome = () => {
    router.push("/")
  }

  return (
    <Container className={styles.narvBar}>
      <Image className={styles.logo} src={redder} alt='Reddder' height={40}  onClick={toHome}/>
      <SearchContainer className={styles.searchContainer}>
        <form className={styles.searchForm} onSubmit={searchHandler}>
          <input className={styles.searchInput} type='text' name='r' placeholder='Search...' required />
          <button className={styles.searchButton} type='submit'>
            <Image src={search} alt='search' width={20}/>
          </button>
        </form>
      </SearchContainer>
    </Container>
  )
}
