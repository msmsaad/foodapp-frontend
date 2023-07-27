type Meal = {
  title: string;
  thumbnail: string;
  id: number;
  price: number;
};

export type carts_meals = {
  id: number;
  quantity: number;
  meal: Meal
}

export interface CartResponse {
  id: string,
  created_at: string,
  updated_at: string,
  carts_meals: carts_meals[];
}