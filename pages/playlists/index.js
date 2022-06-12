import Layout from "../../components/Layout";
import Table from "../../components/Table";

const Playlists = () => {
  return (
    <Layout title="플레이리스트">
      <Table category="featured-playlists" limit="10" count="5" />
    </Layout>
  );
};

export default Playlists;
