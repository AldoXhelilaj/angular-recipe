import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { AuthComponent } from "./auth/auth.component";



const appRoutes: Routes = [
    { path: '', redirectTo: "/recipes", pathMatch: 'full' },
    {
        path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    { path: 'auth', component: AuthComponent }

]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}