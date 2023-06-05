import { ChangeDetectorRef, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingriedient } from "../shared/ingriedient.model"
import { ShopingService } from "../shopping-list/shopping.service";
import { Subject } from "rxjs";
@Injectable({
    providedIn: 'root',
})

export class RecipeService {

    constructor(private shoppingListService: ShopingService) {

    }
    recipeChanged = new Subject<Recipe[]>();


    // recipes: Recipe[] = [
    //     new Recipe('new recipe',
    //         'test description',
    //         `https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Chicken-leek-and-broccoli-rice-stir-fry-ffe0df6.jpg?quality=90&webp=true&resize=300,272`,
    //         [new Ingriedient('Meat', 1)]
    //     ),
    //     new Recipe('new recipe 2', 'test description 2', `https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Chicken-leek-and-broccoli-rice-stir-fry-ffe0df6.jpg?quality=90&webp=true&resize=300,272`),
    // ]

    private recipes: Recipe[] = []

    getRecipes() {
        return [...this.recipes];
    }


    fetchRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice());
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngridientsToShopingList(ingridient: Ingriedient[]) {
        this.shoppingListService.addIngridientToRecipe(ingridient)
    }

    deleteRecipe(index) {
        console.log(index + "INDEX")

        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());

        console.log(this.recipes)
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice())
        console.log(this.recipes)
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    selectedRecepie = new Subject<Recipe>();
    isActivated = new Subject<boolean>();


}