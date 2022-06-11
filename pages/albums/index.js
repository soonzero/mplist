import Layout from "../../components/Layout";
import Table from "../../components/Table";

const Albums = () => {
  return (
    <Layout title="앨범">
      <Table category="new-releases" limit="12" count="4" />
    </Layout>
  );
};

export default Albums;
