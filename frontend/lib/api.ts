import axios from 'axios';
import { DetailedRecipe, Recipe } from '@/types/Recipe';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchRecipeById = async (id: string): Promise<DetailedRecipe> => {
    const res = await axios.get(`${BASE_URL}/recipes/info?id=${id}`);
    return res.data.meals[0];
};

export const fetchRecipesByCategory = async (category: string): Promise<DetailedRecipe[]> => {
    const res = await axios.get(`${BASE_URL}/recipes?category=${category}`);
    return res.data.meals ?? [];
};

export const fetchRecipes = async (ingredient: string, country: string, category: string): Promise<Recipe[]> => {
    const query = new URLSearchParams();
    if (ingredient) query.append('ingredient', ingredient);
    if (country) query.append('country', country);
    if (category) query.append('category', category);

    const res = await axios.get(`${BASE_URL}/recipes?${query.toString()}`);
    return res.data.meals ?? [];
};
