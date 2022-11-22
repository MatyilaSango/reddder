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
        },
    };
};

export default function SubRed({ mediaLink, title, likes, lsource }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Priview content." />
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
