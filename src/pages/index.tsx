import { GetStaticProps } from 'next';
import { Layout } from '@components/Layout/Layout';
import { categoriesFetcher } from '@services';
import { Category } from '../types/Category';
import { setCategories } from '@redux/slices/categorySlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import CategoryCarousel from '@components/molecules/CategoryCarousel';
import { CategoriesList } from '@components/molecules/CategoryList';

export default function CategoriesPage({
  categories = [],
}: {
  categories: Category[] | [];
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories(categories));
  }, [categories, dispatch]);

  return (
    <Layout title="Categories">
      <CategoriesList {...{ categories }} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { categories } = await categoriesFetcher<{ categories: Category[] }>(
      '/categories'
    );
    return {
      props: {
        categories,
      },
      revalidate: 3600, // Re-generate the page every 1 hour
    };
  } catch (error: any) {
    return {
      props: {},
    };
  }
};
