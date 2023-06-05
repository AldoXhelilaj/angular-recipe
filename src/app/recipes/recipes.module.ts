import { NgModule } from "@angular/core";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipesComponent } from "./recipes.component";
import { StartComponentComponent } from "./start-component/start-component.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { SharedModule } from "../shared/shared.module";
import { BetterHighlightDirective } from "../shared/better-highlight.directive";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        StartComponentComponent,
        RecipeListComponent,
        BetterHighlightDirective
    ],
    imports: [
        FontAwesomeModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        RecipesRoutingModule,
        SharedModule

    ],

    exports: [
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipesComponent,
        StartComponentComponent
    ]
})

export class RecipesModule {

}