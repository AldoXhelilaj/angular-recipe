import { Component, Input, OnInit } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  collapsed = true;
  faCaretDown = faCaretDown;
  id: number;
  @Input() recipe: Recipe;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
      console.log(this.recipe)
    })
  }

  onAddedIngrindients(event) {
    this.recipeService.addIngridientsToShopingList(this.recipe.ingridients)
  }
  onEditComponent() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    const recipesExist = this.recipeService.getRecipes().length > 0;
    if (!recipesExist) {
      this.router.navigate(['/recipes']);
    }


  }

}
