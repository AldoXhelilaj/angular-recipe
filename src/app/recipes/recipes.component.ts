import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {

  constructor(private recipeService: RecipeService, private googleAnalyticsService: GoogleAnalyticsService) { }

  recipeSelected: Recipe

  onRecipeWasSelected(recipe: Recipe) {
    this.recipeSelected = recipe;

  }
  ngOnInit(): void {
    // Track the page view of the recipes list
    this.googleAnalyticsService.trackPageView('/recipes');
  }

}
