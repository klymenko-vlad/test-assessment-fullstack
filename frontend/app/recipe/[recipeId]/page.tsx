'use client';

import {use, useEffect, useState} from 'react';
import Link from 'next/link';
import {DetailedRecipe} from "@/types/Recipe";
import {extractIngredients} from "@/lib/recipeUtils";
import {fetchRecipeById, fetchRecipesByCategory} from "@/lib/api";

type Recipe = Omit<DetailedRecipe, 'ingredients'> & {
    ingredients: string[];
};

export default function RecipeInfoPage({params}: { params: Promise<{ recipeId: string }> }) {

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [categoryRecipes, setCategoryRecipes] = useState<DetailedRecipe[]>([]);
    const [loading, setLoading] = useState(true);

    const {recipeId} = use(params);

    useEffect(() => {
        if (!recipeId) return;

        const fetchRecipe = async () => {
            try {
                setLoading(true);

                const recipeRes = await fetchRecipeById(recipeId);

                const ingredients = extractIngredients(recipeRes)

                const parsedRecipe: Recipe = {...recipeRes, ingredients};

                setRecipe(parsedRecipe);

                const categoryRes = await fetchRecipesByCategory(recipeRes.strCategory);

                setCategoryRecipes(categoryRes ?? []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    if (loading) return <p>Loading recipe...</p>;
    if (!recipe) return <p>Recipe not found</p>;

    const {strMeal, strMealThumb, strArea, strInstructions, strCategory, ingredients} = recipe;

    return (
        <main className="max-w-6xl mx-auto p-6 flex gap-6">
            <div className="flex-1">
                <div className="flex gap-6 mb-8">
                    <img src={strMealThumb} alt={strMeal} className="w-40 h-40 object-cover rounded-md"/>
                    <div>
                        <h1 className="text-4xl font-bold mb-4">{strMeal}</h1>
                        <Link href={`/?country=${strArea}`} className="text-blue-600 text-lg hover:underline">
                            {strArea}
                        </Link>
                        <p className="mt-4">{strInstructions}</p>
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mb-4">Ingredients:</h2>
                <ul className="list-disc pl-6">
                    {ingredients.map((ingredient, idx) => (
                        <li key={idx} className="mb-2">
                            <Link href={`/?ingredient=${ingredient}`} className="text-blue-600 hover:underline">
                                {ingredient}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <aside className="w-72 bg-gray-900 p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Recipes in {strCategory} category</h2>
                <ul>
                    {categoryRecipes.map((catRecipe) => (
                        <li key={catRecipe.idMeal} className="mb-4">
                            <Link href={`/recipe/${catRecipe.idMeal}`} className="flex gap-4 items-center">
                                <img
                                    src={catRecipe.strMealThumb}
                                    alt={catRecipe.strMeal}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                                <p>{catRecipe.strMeal}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </main>
    );
}
