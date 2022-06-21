import Layout from "../../components/Layout";
import Table from "../../components/Table";

const Playlists = () => {
  return (
    <Layout title="플레이리스트">
      <Table category="featured-playlists" limit="8" count="4" />
    </Layout>
  );
};

export default Playlists;
