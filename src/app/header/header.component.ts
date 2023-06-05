import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ErrorService } from '../error-handle/error.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faCaretDown = faCaretDown;
  collapsed = true;


  @Output() featureSelected = new EventEmitter<string>();

  isAuthenticated: boolean;
  errorMessage: string;

  sub: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private errorService: ErrorService) { }

  ngOnInit(): void {

    this.sub = this.authService.user.subscribe(user => {
      if (user) {
        this.isAuthenticated = true
      } else {
        this.isAuthenticated = false
      }
    }

    )
  }
  // onSelect(feature) {
  //   this.featureSelected.emit(feature)
  // }


  onSaveRecipe() {
    this.dataStorageService.saveData()
  }

  onFetchRecipe() {
    this.dataStorageService.fetchData().subscribe(recipes => {
      // Handle successful response and display recipes
    },
      error => {
        // Handle the error when no recipes are available
        console.log(error);
        // Display an error message or handle it as per your application's requirements
        this.errorService.setErrorMessage(error)



      })
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
