import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Ingriedient } from '../shared/ingriedient.model';
import { LoggingService } from '../services/logging.service';
import { ShopingService } from './shopping.service';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
  cleared = false;
  private clearedSub: Subscription;
  private ingridientsSub: Subscription;

  ingridients: Ingriedient[]

  constructor(private loggingService: LoggingService, private shopingService: ShopingService, private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.ingridients = this.shopingService.getIngredients();
    this.ingridientsSub = this.shopingService.ingredientsChanged.subscribe((ingridient: Ingriedient[]) => this.ingridients = ingridient);
    this.clearedSub = this.recipeService.isActivated.subscribe((isActivated: boolean) => {
      this.cleared = isActivated;
    })
  }

  onEditItem(index: number) {
      this.shopingService.editStarted.next(index);
  }

  ngOnDestroy(): void {
    this.clearedSub.unsubscribe()
    this.ingridientsSub.unsubscribe()
  }


}
