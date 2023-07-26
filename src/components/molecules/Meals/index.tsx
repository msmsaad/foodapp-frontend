import _ from 'lodash';

const Meals = ({ meals }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {meals.map((meal, index) => (
        <div key={index} className="card w-auto bg-base-100 shadow-xl">
          <figure><img src={meal.strMealThumb} alt={meal.strMeal} /></figure>
          <div className="card-body">
            <h2 className="card-title">{meal.strMeal}</h2>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
          </div>
      ))}
    </div>
  )
}

export default Meals