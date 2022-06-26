import Layout from "../components/common/Layout";
import Table from "../components/common/Table";

export default function Home() {
  return (
    <Layout title="메인">
      <Table category="new-releases" limit="12" count="4" />
      <Table category="featured-playlists" limit="8" count="4" />
    </Layout>
  );
}
