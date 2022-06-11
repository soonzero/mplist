import Layout from "../components/Layout";
import Table from "../components/Table";

export default function Home() {
  return (
    <Layout title="메인">
      <Table category="new-releases" limit="12" count="4" />
      <Table category="featured-playlists" limit="10" count="5" />
    </Layout>
  );
}
