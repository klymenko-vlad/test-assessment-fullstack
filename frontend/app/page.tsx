'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {useSearchParams, useRouter} from 'next/navigation';
import {Recipe} from '@/types/Recipe';
import {fetchRecipes} from "@/lib/api";

export default function RecipeListPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [ingredient, setIngredient] = useState('');
    const [country, setCountry] = useState('');
    const [category, setCategory] = useState('');

    const router = useRouter();
    const searchParams = useSearchParams();

    const title =
        ingredient
            ? `Recipes with ${ingredient}`
            : country
                ? `Recipes from ${country}`
                : category
                    ? `Recipes in ${category}`
                    : 'All Recipes';

    useEffect(() => {

        setIngredient(searchParams.get('ingredient') || '');
        setCountry(searchParams.get('country') || '');
        setCategory(searchParams.get('category') || '');

        fetchRecipes(ingredient, country, category).then((data) => setRecipes(data));
    }, [searchParams]);

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();

        const query = new URLSearchParams();

        if (ingredient) query.append('ingredient', ingredient);
        if (country) query.append('country', country);
        if (category) query.append('category', category);

        router.push(`/?${query.toString()}`);
    };

    return (
        <main className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>

            <form onSubmit={handleFilter} className="mb-8 flex flex-wrap gap-4 justify-center">
                <input
                    type="text"
                    placeholder="Ingredient"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    className="border p-2 rounded w-40"
                />
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="border p-2 rounded w-40"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded w-40"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Apply Filters
                </button>
            </form>

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {recipes.map((recipe) => (
                    <li key={recipe.idMeal}
                        className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                        <Link href={`/recipe/${recipe.idMeal}`} className="block">
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="w-full h-40"
                            />
                            <p className="p-4 text-center font-medium">{recipe.strMeal}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
