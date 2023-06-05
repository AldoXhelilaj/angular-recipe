import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private errorMessageSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public errorMessage$ = this.errorMessageSubject.asObservable();

    constructor() { }

    setErrorMessage(message: string): void {
        this.errorMessageSubject.next(message);
    }

    clearErrorMessage(): void {
        this.errorMessageSubject.next(null);
    }
}
