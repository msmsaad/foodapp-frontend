import { useGetCartQuery } from '@redux/api';
import Image from 'next/image';
import { IMAGE_DIMENSIONS } from 'src/constants';

const CartDrawer = () => {
  const { data, isLoading } = useGetCartQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  const { carts_meals = [] } = data;

  const calculateTotal = () => {
    let totalAmount = 0;

    for(let i = 0; i < carts_meals.length; i++) {
        totalAmount += carts_meals[i].meal.price * carts_meals[i].quantity;
    }

    return totalAmount;
  }

  return (
    <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label tabIndex={0} htmlFor="my-drawer-4" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">{carts_meals.length}</span>
            </div>
          </label>
        </div> 
        <div className="drawer-side z-10">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="menu p-4 w-auto h-full bg-base-200 text-base-content">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Meals</th>
                  <th>Actions</th>
                  <th>Prices</th>
                </tr>
              </thead>
              <tbody>
                {carts_meals.map((carts_meal, index)=>(
                   <tr key={index}>
                   <td>
                     <div className="flex items-center space-x-3">
                       <div className="avatar">
                         <div className="mask mask-squircle w-12 h-12">
                           <figure>
                            <Image
                              src={carts_meal.meal.thumbnail}
                              alt={carts_meal.meal.title}
                              width={IMAGE_DIMENSIONS.width}
                              height={IMAGE_DIMENSIONS.height}
                            />
                          </figure>
                         </div>
                       </div>
                       <div>
                         <div className="font-bold">{carts_meal.meal.title}</div>
                       </div>
                     </div>
                   </td>
                   <td>
                   <div className="form-control">
                     <div className="flex items-center input-group">
                         <button className="btn btn-square">-</button>
                         <div className="badge badge-primary">{carts_meal.quantity}</div>
                         <button className="btn btn-square">+</button>
                       </div>
                     </div>
                   </td>
                   <td>
                     <button className="btn">
                       ${carts_meal.meal.price} X {carts_meal.quantity}
                       <div className="badge badge-secondary">${carts_meal.meal.price * carts_meal.quantity}</div>
                     </button>
                     <button>X</button>
                   </td>
                 </tr>))}
              </tbody>
            </table>

            <div className="bg-neutral-focus rounded-box text-primary-content">
              <div className="stat flex flex-col items-center">
                <div className="stat-title">Total Amount</div>
                <div className="stat-value">${calculateTotal()}</div>
                <button className="btn btn-sm btn-success">Checkout</button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
  )
}
export default CartDrawer
