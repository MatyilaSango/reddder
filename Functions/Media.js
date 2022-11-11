import styles from '../styles/Home.module.css'

export const isMedia = (e) => {
    if(e.includes("png") || e.includes("jpg") ||e.includes("jpeg") || e.includes("gif") || e.includes("mp4")){
      return true;
    } 
    return false
  }

export const isImage = (e) => {
    if(e.includes("png") || e.includes("jpg") || e.includes("jpeg") || e.includes(".gif")){
      return true;
    } 
    return false
  }
export const isVideo = (e) => {
    if(e.includes("redgif") || e.includes("mp4") || e.includes("gifv")){
      return true;
    } 
    return false
  }

export const getMedia = (e) => {
    if(isVideo(e.url) && (typeof(e.preview.reddit_video_preview) !== "undefined")){
      return (<video src={e.preview.reddit_video_preview.fallback_url} preload='auto' controls className={styles.srcContentPic}/>)
    }
    else if(isImage(e.url) && (typeof(e.url) !== "undefined")){
      return (<img src={e.url} alt='pic' className={styles.srcContentPic}/>)
    }
    
  }
export const getPreviewMedia = (e) => {
    if(isImage(e)){
        return (<img src={e} alt='pic' className={styles.srcContentPic}/>)
    }
    else if(isVideo(e)) {
        return (<video src={e} preload='auto' controls vol className={styles.srcContentPic}/>) 
    }
}

export const getMediaLink = (e) => {
    return getMedia(e).props.src
  }