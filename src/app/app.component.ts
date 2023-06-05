import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ErrorService } from './error-handle/error.service';
import { GoogleAnalyticsService } from './google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  loadedfeature = "recipe";
  errorMessage: string;

  constructor(private authService: AuthService, private errorService: ErrorService, private googleAnalyticsService: GoogleAnalyticsService) {

  }
  ngOnInit(): void {
    this.authService.autologin()
    this.errorService.errorMessage$.subscribe((message: string) => {
      this.errorMessage = message;
    })
    this.googleAnalyticsService.initializeGoogleAnalytics('G-GTRBW16QCR');
  }

  clearErrorMessage(): void {
    this.errorService.clearErrorMessage();
  }

  onNavigationChange(feature: string) {
    this.loadedfeature = feature;
    console.log(feature);
  }
}


