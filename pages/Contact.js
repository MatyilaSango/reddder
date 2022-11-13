import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { ContactContainer } from '../styles/Contactstyles'
import Footer from '../Components/Footer'


export default function Home() {

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const dataForm = {}
    Array.from(e.currentTarget.elements).forEach(field => {
      if(!field.name) return;
      dataForm[field.name] = field.value;
    });
    fetch('/api/mail', {
      method: 'post',
      body: JSON.stringify(dataForm)
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((res) => {
          alert(res.result)
        })
      }
    })
    
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact me</title>
        <meta name="description" content="Get in touch with me." />
        <link rel="icon" href="/Reddder.png" type='png' />
      </Head>

      <div className={styles.bodyContainer}>  

        <ContactContainer>
            <h2>Contact:</h2>
            <form className={styles.emailForm} onSubmit={onSubmitHandler}>
              <input className={styles.emailInput} name="name" type="text" placeholder='Name' required/>
              <input className={styles.emailInput} name="email" type="text" placeholder='Email' required/>
              <textarea className={styles.emailTextArea} name="message" placeholder='Message' required/>
              <input className={styles.emailSend} id="form" type="submit" value="Send" />
            </form>

        </ContactContainer>
        
        
      </div>
    </div>
  )
}