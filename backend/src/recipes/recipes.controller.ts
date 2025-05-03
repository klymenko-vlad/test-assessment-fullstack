import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import {RecipesService} from "./recipes.service";

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
    constructor(private readonly recipesService: RecipesService) {}

    @Get()
    @ApiQuery({ name: 'ingredient', required: false })
    @ApiQuery({ name: 'country', required: false })
    @ApiQuery({ name: 'category', required: false })
    async getAvailableRecipes(
        @Query('ingredient') ingredient?: string,
        @Query('country') country?: string,
        @Query('category') category?: string,
    ) {
        return this.recipesService.getRecipes({ ingredient, country, category });
    }

    @Get('info')
    @ApiQuery({ name: 'id', required: true })
    async getRecipeInfo(@Query('id') id: string) {
        return this.recipesService.getRecipeById(id);
    }
}