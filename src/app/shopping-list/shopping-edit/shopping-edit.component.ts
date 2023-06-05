import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';
import { Ingriedient } from 'src/app/shared/ingriedient.model';
import { ShopingService } from '../shopping.service';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],

})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: true }) formRef: NgForm;
  @Output() ingridientAdded = new EventEmitter<Ingriedient>();
  constructor(private loggingService: LoggingService, private shopingService: ShopingService, private recipeService: RecipeService) { }
  defaultName = "Add name";
  subscription: Subscription;
  editMode = false;
  editIndex: number;
  editedItem: Ingriedient;


  ngOnInit(): void {
    this.subscription = this.shopingService.editStarted.subscribe((index: number) => {
      this.editMode = true;
      this.editIndex = index;
      this.editedItem = this.shopingService.getSingleIngredient(index);
      this.formRef.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })

    })
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

  onSubmit(form: NgForm): void {
    const value = form.value
    const newIngridient = new Ingriedient(value.name, value.amount)
    if(this.editMode) {
      this.shopingService.updateIngredients(this.editIndex, newIngridient)
    } else {
      this.shopingService.addIngridient(newIngridient)
    }
    this.editMode = false;
    console.log(form)
    this.formRef.form.reset()
 
    // this.formRef.form.patchValue({

    //   name: 'default name',

    //   amount: 0
    // })
  }

  onDelete(){
    this.shopingService.deleteIngredient(this.editIndex);
   this.formRef.reset();
   this.editMode = false;
  }

  onClear() {
    this.formRef.reset();
    this.editMode = false;
    this.recipeService.isActivated.next(true)
    setTimeout(() => {
      this.recipeService.isActivated.next(false)

    }, 1000)
  }
}
