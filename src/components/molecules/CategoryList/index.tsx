import React from 'react';
import { Category } from '../../../types/Category';
import Image from 'next/image';
import { IMAGE_DIMENSIONS } from 'src/constants';
import _ from 'lodash';
import Link from 'next/link';
interface ICategoryListProps {
  categories: Category[];
}

export const CategoriesList = ({ categories }: ICategoryListProps) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {categories.map((category, index) => (
        <div key={index} className="card bg-base-100 shadow-xl image-full z-0">
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
            <div className="divider"></div>
            <div className="card-actions justify-center">
              <Link className="btn btn-primary" href={`/category/${category.strCategory}/meals`}>
                View Meals
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
