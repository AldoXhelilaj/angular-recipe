import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { GoogleAnalyticsService } from 'src/app/google-analytics.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.recipeChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();


  }

  onEditRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
    // Track a button click event
    this.googleAnalyticsService.trackEvent('Button Click', 'User Interaction', 'Click', 'Button 1');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
