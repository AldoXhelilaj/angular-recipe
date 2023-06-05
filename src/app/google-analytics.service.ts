import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag; // Declare the global gtag function from Google Analytics

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService {

    constructor(private router: Router) { }

    initializeGoogleAnalytics(trackingId: string): void {
        // Initialize Google Analytics with the provided tracking ID
        gtag('create', trackingId, 'auto');

        // Track the initial page view when the application loads
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', trackingId, { 'page_path': event.urlAfterRedirects });
            }
        });
    }

    trackEvent(eventName: string, eventCategory: string, eventAction: string, eventLabel: string): void {
        // Track a custom event in Google Analytics
        gtag('event', eventName, {
            event_category: eventCategory,
            event_action: eventAction,
            event_label: eventLabel
        });
    }

    trackPageView(pagePath: string): void {
        // Track a page view in Google Analytics
        gtag('config', 'G-GTRBW16QCR', { 'page_path': pagePath });
    }
}
