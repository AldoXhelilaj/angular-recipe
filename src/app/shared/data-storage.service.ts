import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService, private router: Router) {

    }
    saveData() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://angular-recipe-33f38-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(
            () => {
                console.log('Recipes saved successfully!');
            },
            (error) => {
                console.error('An error occurred while saving the recipes:', error);
            }
        );
    }


    fetchData() {
        return this.http.get<Recipe[]>('https://angular-recipe-33f38-default-rtdb.firebaseio.com/recipes.json').pipe(
            map(recipes => {

                if (!recipes) {
                    throw new Error('No recipes available.'); // Throw an error if no recipes are found
                }

                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingridients ? recipe.ingridients : []
                    };
                });
            }),
            tap(recipes => {
                this.recipeService.fetchRecipes(recipes);
            })
        )


    }


    // fetch data without interecptors
    // fetchData() {

    //     return this.authService.user.pipe(take(1), exhaustMap(user => {
    //         return (
    //             this.http.get<Recipe[]>('https://angular-recipe-33f38-default-rtdb.firebaseio.com/recipes.json', {
    //                 params: new HttpParams().set('auth', user.token)
    //             })
    //         )
    //     }),
    //         map(recipes => {
    //             return recipes.map(recipe => {
    //                 return {
    //                     ...recipe,
    //                     ingredients: recipe.ingridients ? recipe.ingridients : []
    //                 };
    //             });
    //         }),
    //         tap(recipes => {
    //             this.recipeService.fetchRecipes(recipes);
    //         })
    //     )
    // }
}