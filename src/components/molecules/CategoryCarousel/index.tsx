import { Category } from '@types';
import Image from 'next/image';
import React from 'react';
import { IMAGE_DIMENSIONS } from 'src/constants';

interface ICategoryCarouselProps {
  categories: Category[];
}

const CategoryCarousel = ({ categories }: ICategoryCarouselProps) => {
  return (
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
  );
};

export default CategoryCarousel;
