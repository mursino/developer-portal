// Global
import ReactMarkdown from "react-markdown";
// Lib
import { getMarkdownData, getPageLevelInfoForFile } from "@/lib/getMarkdownData";
// Interfaces
import { MarkdownAsset, MarkdownMeta } from '@/interfaces/markdownAsset';
// Components
import Layout from '@/components/layout/Layout';
import StackExchangeFeed from '@/components/stackExchangeFeed';
import TwitterFeed from '@/components/twitterFeed';
import styles from '@/styles/Home.module.css';

export async function getStaticProps() {
  const communityMarkDownFolder = "community";
  const pageInfo = await getPageLevelInfoForFile("community.md", communityMarkDownFolder)
  const slack = await getMarkdownData("slack.md", communityMarkDownFolder);
  const stackExchange = await getMarkdownData("stackexchange.md", communityMarkDownFolder);
  const forums = await getMarkdownData("forums.md", communityMarkDownFolder);
  const mvpSite = await getMarkdownData("mvp.md", communityMarkDownFolder);

  return {
      props: {
          pageInfo,
          forums,
          slack,
          stackExchange,
          mvpSite,
      },
  };
}

export default function Community({ pageInfo, forums, slack, stackExchange: stackExchange, mvpSite }: {pageInfo: MarkdownMeta, forums: MarkdownAsset, slack: MarkdownAsset, stackExchange: MarkdownAsset, mvpSite: MarkdownAsset}) {
  return (
    <Layout pageInfo={pageInfo}>
      <div className={styles.grid}>
        <div className={styles.productCategoryCard}>
          <ReactMarkdown>{slack.markdown}</ReactMarkdown>
        </div>
        <div className={styles.productCategoryCard}>
          <ReactMarkdown>{stackExchange.markdown}</ReactMarkdown>
        </div>
        <div className={styles.productCategoryCard}>
          <ReactMarkdown>{forums.markdown}</ReactMarkdown>
        </div>
        <div className={styles.productCategoryCard}>
          <ReactMarkdown>{mvpSite.markdown}</ReactMarkdown>
        </div>
        <TwitterFeed pageInfo={pageInfo} />
        <StackExchangeFeed pageInfo={pageInfo} />
      </div>
    </Layout>
  )
}
