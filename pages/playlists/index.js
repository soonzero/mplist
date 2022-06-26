import Layout from "../../components/common/Layout";
import Table from "../../components/common/Table";

const Playlists = () => {
  return (
    <Layout title="플레이리스트">
      <Table category="featured-playlists" limit="8" count="4" />
    </Layout>
  );
};

export default Playlists;
