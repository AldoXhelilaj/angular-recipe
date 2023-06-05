import { Component, Input, OnInit, } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { LoggingService } from 'src/app/services/logging.service';
import { RecipeService } from '../../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {

  constructor(private loggingService: LoggingService, private recipeService: RecipeService, private route: ActivatedRoute) { }
  @Input() recipes: Recipe;
  @Input() id: number;

  ngOnInit(): void {

  }


}
