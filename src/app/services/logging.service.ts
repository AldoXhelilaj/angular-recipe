import { EventEmitter, Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class LoggingService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function

    statusUpdate = new EventEmitter<string>();

    loginService(status) {
        console.log(status);
    }


}