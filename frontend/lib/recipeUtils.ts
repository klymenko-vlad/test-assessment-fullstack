import {DetailedRecipe} from '@/types/Recipe';

export const extractIngredients = (raw: DetailedRecipe): string[] => {
    return Object.keys(raw)
        .filter(key => key.startsWith('strIngredient') && raw[key])
        .map(key => raw[key]);
};
