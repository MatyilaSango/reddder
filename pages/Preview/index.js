import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import like from "../../images/Like.png";
import source from "../../images/source.png";
import { getPreviewMedia } from "../../Functions/Media";

export const getServerSideProps = async (context) => {
    return {
        props: {
            mediaLink: context.query.l,
            title: context.query.t,
            likes: context.query.u,
            lsource: context.query.s,
            author: context.query.a,
            meta_url: 'https://reddder.vercel.app/Preview?l='+context.query.l+'&t='+context.query.t+'&u='+context.query.u+'&s='+context.query.s
        },
    };
};

export default function SubRed({ mediaLink, title, likes, lsource, meta_url, author }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Priview content." />
                <meta property="og:site_name" content="Reddder" />
                <meta property="og:url" content= {meta_url} />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={mediaLink} />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="720" />
                <link rel="icon" href="/Reddder.png" type="png" />
            </Head>

            <div className={styles.bodyContainer}>
                <div className={styles.contentPriviewContainer}>
                    <div className={styles.contentPreviewDiv}>
                        {getPreviewMedia(mediaLink)}

                        <div className={styles.contentBottomFlowDiv}>
                            <div className={styles.picTitle}>
                                <div className={styles.srcPic}>
                                    <a href={lsource} target="_blank">
                                        <Image src={source} alt="pic" width={40} />
                                    </a>
                                </div>
                                <div className={styles.usernameText}>
                                    <a href={`/Search?q=${author}`}>
                                        @{author}
                                    </a>
                                </div>
                                <div className={styles.srcTitle}>
                                    <>{title}</>
                                </div>
                            </div>
                            

                            <div className={styles.srcLikes}>
                                <Image src={like} alt="pic" width={25} />
                                <>{likes}</>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
