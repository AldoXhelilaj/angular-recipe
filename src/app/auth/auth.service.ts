import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./auth.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })

export class AuthService {
    // Track the logged-in user
    public user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private tokenExpirationTimer;



    // private user: User | null = null;

    constructor(private http: HttpClient, private router: Router) {
    }

    signUp = (email: string, password: string) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApi,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.errorMessageHandler),
                tap((responseData: AuthResponseData) => {
                    return this.handleAuth(responseData.email, responseData.idToken, +responseData.expiresIn, responseData.localId);

                }
                ))
    }



    login = (email: string, password: string) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApi,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.errorMessageHandler),
                tap((responseData: AuthResponseData) => {
                    this.handleAuth(responseData.email, responseData.idToken, +responseData.expiresIn, responseData.localId);
                }))

    }

    logout() {
        this.user.next(null);
        localStorage.setItem('userData', null)
        this.router.navigate(['/auth'])
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;

    }

    autologin() {
        const userData: User = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);

        if (userData) {
            const loadedUser = new User(userData.email, userData._token, userData._tokenExpirationDate, userData.uid)
            if (loadedUser.token) {
                console.log(loadedUser.token)
                this.user.next(loadedUser) // Use next() to update the value of BehaviorSubject
                const currentTime = new Date().getTime();
                const expirationTime = new Date(userData._tokenExpirationDate).getTime() - currentTime;

                console.log(expirationTime)
                this.autoLogout(expirationTime)
            }
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuth(email: string, token: string, expiresIn: number, userId: string) {
        const expirationDate = this.calculateExpirationDate(expiresIn);
        const user = new User(email, token, expirationDate, userId);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    // getCurrentUser() {
    //     this.user.asObservable();
    // }

    isUserLoggedIn() {
        return this.user.value !== null
    }

    private calculateExpirationDate(expiresIn: number): Date {
        const currentTime = new Date().getTime();
        const expirationTime = currentTime + expiresIn * 1000; // Convert expiresIn to milliseconds
        return new Date(expirationTime);
    }

    errorMessageHandler = (errorMsg: HttpErrorResponse) => {
        let errorMessage = 'An error occurred. Please try again.';


        // Check if the error response contains a specific error message
        if (errorMsg.error.error.message) {
            errorMessage = errorMsg.error.error.message.replace(/_/g, ' ');
        }

        return throwError(errorMessage);

    }
}