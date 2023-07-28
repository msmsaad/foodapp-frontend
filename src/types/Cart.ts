type Meal = {
  title: string;
  thumbnail: string;
  id: number;
  price: number;
};

export type CartMeal = {
  id: number;
  quantity: number;
  meal: Meal;
};

export interface Cart {
  id: string;
  created_at: string;
  updated_at: string;
  carts_meals: CartMeal[];
}
