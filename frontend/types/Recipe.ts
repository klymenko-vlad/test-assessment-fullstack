export interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
};

export interface DetailedRecipe extends Recipe {
    strArea: string;
    strCategory: string;
    strInstructions: string;
    [key: string]: any;
};