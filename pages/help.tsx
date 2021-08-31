import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getMarkdownData, getPageLevelInfoForFile } from '../lib/getMarkdownData';
import { useRouter } from 'next/dist/client/router';
import ReactMarkdown from 'react-markdown';
import { MarkdownMeta } from '../interfaces/markdownAsset';
import { MarkdownAsset } from '../interfaces/markdownAsset';

export async function getStaticProps() {
    const communityMarkDownFolder = "community";
    const helpMarkDownFolder = "help";
    const pageInfo = await getPageLevelInfoForFile("help.md", helpMarkDownFolder);
    const slack = await getMarkdownData("slack.md", communityMarkDownFolder);
    const stackexchange = await getMarkdownData("stackexchange.md", communityMarkDownFolder);
    const forums = await getMarkdownData("forums.md", communityMarkDownFolder);
    const support = await getMarkdownData("support.md", helpMarkDownFolder);
  
    return {
        props: {
            pageInfo,
            forums,
            slack,
            stackexchange,
            support,
        },
    };
}

export default function Help({ pageInfo, forums, slack, stackexchange, support }: {pageInfo: MarkdownMeta, forums: MarkdownAsset, slack: MarkdownAsset, stackexchange: MarkdownAsset, support: MarkdownAsset}) {
    const router = useRouter()

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{pageInfo.prettyName}</title>
                <meta name="description" content={pageInfo.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {pageInfo.prettyName}
                </h1>
                <p>
                    {pageInfo.description}
                </p>
                <div className={styles.grid}>
                    <div className={styles.socialsCard}>
                        <ReactMarkdown>{support.markdown}</ReactMarkdown>
                    </div>
                    <div className={styles.youtubeCard}>
                        <h2>Ask the community</h2>
                        <div className={styles.threeColumn}>
                        <div className={styles.oneThirdCard}>
                            <ReactMarkdown>{slack.markdown}</ReactMarkdown>
                        </div>
                        <div className={styles.oneThirdCard}>
                            <ReactMarkdown>{stackexchange.markdown}</ReactMarkdown>
                        </div>
                        <div className={styles.oneThirdCard}>
                            <ReactMarkdown>{forums.markdown}</ReactMarkdown>
                        </div>
                        </div>
                    </div>
                    <div className={styles.youtubeCard}>
                        <h2>Contact Us info here (or redirect to sitecore.com contact)</h2>
                    </div>
                    <div className={styles.youtubeCard}>
                        <h2>Latest StackExchange questions</h2>
                    </div>
                </div>
            </main>
        </div>)
}

