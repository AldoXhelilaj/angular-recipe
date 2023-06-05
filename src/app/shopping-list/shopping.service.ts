import { Injectable } from "@angular/core";
import { Ingriedient } from "../shared/ingriedient.model";
import { Subject } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
@Injectable({
  providedIn: "root"
})

export class ShopingService {
  ingredientsChanged = new Subject<Ingriedient[]>();
  editStarted = new Subject<number>();
  ingridients: Ingriedient[] = [
    new Ingriedient('Apple', 5),
    new Ingriedient('Bananas', 56)
  ];

  getIngredients() {
    return [...this.ingridients];
  }

  getSingleIngredient(index) {
    return this.ingridients[index];
  }

  deleteIngredient(index) {
    this.ingridients.splice(index, 1);
    this.ingredientsChanged.next(this.ingridients.slice());

  }
  updateIngredients(index: number, newIngredient) {
    this.ingridients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingridients.slice());
  }
  addIngridient(ingriedient: Ingriedient) {
    this.ingridients.push(ingriedient)
    this.ingredientsChanged.next(this.ingridients.slice())
  }
  addIngridientToRecipe(ingridient: Ingriedient[]) {
    this.ingridients.push(...ingridient);
    this.ingredientsChanged.next(this.ingridients.slice())
  }
}