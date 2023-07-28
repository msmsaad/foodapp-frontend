import { useAddToCartMutation, useLazyCheckOutQuery } from "@redux/api";
import { CartMeal } from "@types";
import Image from "next/image";
import { Key } from "react";
import { useSelector } from "react-redux";
import { IMAGE_DIMENSIONS } from "src/constants";
import { useRouter } from "next/router";

const CartDrawer = () => {
  const { cart = [] } = useSelector((state) => state.session);

  const [addToCart] = useAddToCartMutation();
  const [trigger, { isLoading }] = useLazyCheckOutQuery();

  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const {
        data: { checkout_url: url },
      } = await trigger({
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/thank_you`,
      });
      router.replace(url);
    } catch (e) {}
  };

  const calculateTotal = () => {
    let totalAmount = 0;

    for (let i = 0; i < cart?.length; i++) {
      totalAmount += cart[i].meal.price * cart[i].quantity;
    }

    return totalAmount;
  };

  const handleAddToCart = async (cartMeal: CartMeal, isIncreasing: boolean) => {
    const updatedQuantity = isIncreasing
      ? cartMeal.quantity + 1
      : cartMeal.quantity - 1;
    if (updatedQuantity > 0) {
      try {
        await addToCart({
          quantity: updatedQuantity,
          id: parseInt(cartMeal.id),
          meal_id: parseInt(cartMeal.meal.id),
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleDelete = async (cartMeal) => {
    try {
      await addToCart({
        id: parseInt(cartMeal.id),
        quantity: cartMeal.quantity,
        meal_id: parseInt(cartMeal.meal.id),
        _destroy: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          tabIndex={0}
          htmlFor="my-drawer-4"
          className="btn btn-ghost btn-circle"
        >
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-ghost badge-sm indicator-item">
              {cart?.length || 0}
            </span>
          </div>
        </label>
      </div>
      <div className="drawer-side z-10">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="menu p-4 w-auto h-full bg-base-200 text-base-content">
          <div className="overflow-x-auto">
            <>
              <button className="btn btn-ghost w-full">Cart</button>
            </>{" "}
            <div className="divider" />
            {cart?.map((cartMeal: CartMeal, index: Key) => (
              <div key={index}>
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 mr-6">
                        <figure>
                          <Image
                            src={cartMeal.meal.thumbnail}
                            alt={cartMeal.meal.title}
                            width={IMAGE_DIMENSIONS.width}
                            height={IMAGE_DIMENSIONS.height}
                          />
                        </figure>
                      </div>
                    </div>
                    <div className="w-50">
                      <div className="font-bold">{cartMeal.meal.title}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="mr-10">
                          Quantiy: {cartMeal.quantity}{" "}
                        </span>
                        <div className="btn-group btn-group-vertical lg:btn-group-horizontal">
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => handleAddToCart(cartMeal, true)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-xs btn-outline"
                            disabled={cartMeal.quantity === 1}
                            onClick={() => handleAddToCart(cartMeal, false)}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-xs btn-outline text-red-500"
                            onClick={() => handleDelete(cartMeal)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="btn">
                        ${cartMeal.meal.price} X {cartMeal.quantity}
                        <div className="badge badge-secondary">
                          ${cartMeal.meal.price * cartMeal.quantity}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="divider" />
              </div>
            ))}
            <div className="text-primary-content">
              <div className="stat flex flex-col items-center">
                <div className="stat-title text-primary-content">
                  Total Amount
                </div>
                <div className="stat-value">${calculateTotal()}</div>
                <button
                  className="btn btn-sm btn-accent"
                  disabled={isLoading || cart.length === 0}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
            <div className="flex w-full justify-center mt-4">
              <Image
                src="/images/delivery-truck.gif"
                width={200}
                height={200}
                alt="delivery truck"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartDrawer;
