export type Meal = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export interface PagyInfo {
  current_page: number;
  total_pages: number;
}

export interface MealsResponse {
  meals: Meal[];
  pagy: PagyInfo;
}

export interface Meals extends Array<Meal> {}
