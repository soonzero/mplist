import Layout from "../../components/common/Layout";
import Table from "../../components/common/Table";

const Albums = () => {
  return (
    <Layout title="앨범">
      <Table category="new-releases" limit="12" count="4" />
    </Layout>
  );
};

export default Albums;
