import { Layout } from '@components/Layout/Layout';
import Meals from '@components/molecules/Meals/index';
import { useGetMealsQuery } from '@redux/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DEFAULT_CATEGORY, STARTING_PAGE } from 'src/constants';
import Pagination from '@components/common/Pagination';
import Breadcrumb from '@components/common/BreadCrumb';
import Loader from '@components/common/Loader';

const MealsPage = () => {
  const router = useRouter();
  const { category } = router.query;

  const [page, setPage] = useState(STARTING_PAGE);
  const { data, isLoading } = useGetMealsQuery({
    category: category || DEFAULT_CATEGORY,
    page,
  });

  if (isLoading) return <Loader />;
  if (!data) return <div>No data available</div>;

  const { meals = [] } = data;

  return (
    <Layout title="Meals">
      <Breadcrumb
        links={[
          { title: 'Home', href: '/' },
          { title: category, href: `/category/${category}` },
        ]}
      />

      <Meals {...{ meals }} />
      {data?.pagy && (
        <Pagination
          pageCount={data.pagy.total_pages}
          onPageChange={({ selected }) => setPage(selected + 1)}
        />
      )}
    </Layout>
  );
};

export default MealsPage;
