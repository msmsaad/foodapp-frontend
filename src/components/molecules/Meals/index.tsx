import { useAddToCartMutation } from '@redux/api';
import { Meal } from '@types';
import _ from 'lodash';
import Image from 'next/image';
import { IMAGE_DIMENSIONS } from 'src/constants';
import { useModal } from '../Modal/useModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'react-toastify';

interface IMealsProps {
  meals: Meal[];
}
const Meals = ({ meals }: IMealsProps) => {
  const { user } = useSelector((state: RootState) => state.session);
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const { toggleModal } = useModal();

  const handleAddToCart = async (mealId: string) => {
    if (!user) {
      toast.warning('Please Login First!');
      toggleModal('auth_modal');
    } else {
      try {
        await addToCart({ meal_id: parseInt(mealId), quantity: 1 });
        toast.success('Successfully added to cart');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {meals.map((meal, index) => (
        <div key={index} className="card w-auto bg-base-100 shadow-xl">
          <figure>
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={IMAGE_DIMENSIONS.width}
              height={IMAGE_DIMENSIONS.height}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title" title={meal.strMeal}>
              {_.truncate(meal.strMeal, { length: 20 })}
            </h2>
            <h3>
              Price: <span className="badge badge-primary">${meal.price}</span>
            </h3>
            <div className="divider"></div>
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={() => handleAddToCart(meal.idMeal)}
              >
                {isLoading ? 'Adding...' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;
