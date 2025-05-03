import {HttpException, Injectable} from '@nestjs/common';
import {BASE_URL} from "./constants/recipes.constants";
import axios from "axios";

@Injectable()
export class RecipesService {

    async getRecipes(filter?: { ingredient?: string; country?: string; category?: string }) {
        try {
            if (filter?.ingredient) {
                const res = await axios.get(`${BASE_URL}/filter.php?i=${filter.ingredient}`);
                return res.data;
            }
            if (filter?.country) {
                const res = await axios.get(`${BASE_URL}/filter.php?a=${filter.country}`);
                return res.data;
            }
            if (filter?.category) {
                const res = await axios.get(`${BASE_URL}/filter.php?c=${filter.category}`);
                return res.data;
            }
            const res = await axios.get(`${BASE_URL}/search.php?s=`);
            return res.data;
        } catch (error) {
            throw new HttpException('Failed to fetch recipes', 500);
        }
    }

    async getRecipeById(id: string) {
        try {
            const res = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
            return res.data;
        } catch (error) {
            throw new HttpException('Failed to fetch recipe info', 500);
        }
    }
}
