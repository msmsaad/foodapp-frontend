import { GetStaticProps } from 'next';
import { Layout } from '@components/Layout/Layout';
import { categoriesFetcher } from '@services';
import Image from 'next/image';
import _ from 'lodash';
import { IMAGE_DIMENSIONS } from 'src/constants';
import { Category } from '../types/Category';
import { setCategories } from '@redux/slices/categorySlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

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
      <div className="carousel rounded-box">
        {categories.map((category, index) => (
          <div key={index} className="carousel-item">
            <Image
              src={category.strCategoryThumb}
              alt={category.strCategory}
              width={IMAGE_DIMENSIONS.width}
              height={IMAGE_DIMENSIONS.height}
            />
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {categories.map((category, index) => (
          <div key={index} className="card bg-base-100 shadow-xl image-full">
            <figure>
              <Image
                src={category.strCategoryThumb}
                alt={category.strCategory}
                width={IMAGE_DIMENSIONS.width}
                height={IMAGE_DIMENSIONS.height}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{category.strCategory}</h2>
              <p>
                {_.truncate(category.strCategoryDescription, { length: 150 })}
              </p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">View Meals</button>
              </div>
            </div>
          </div>
        ))}
      </div>
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
