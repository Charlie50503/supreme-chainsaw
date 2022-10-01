import { Subscription } from 'rxjs';
import {
  Component,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  subscription:Subscription;
  editModel = false;
  editedItemIndex: number;
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription.add(this.slService.startedEditing.subscribe((index:number)=>{
      this.editModel = true
      this.editedItemIndex = index
    }))
  }

  onAddItem(form:NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
