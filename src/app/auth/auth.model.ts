export class User {
    localId: Date;
    constructor(
        public email: string,
        public _token: string,
        public _tokenExpirationDate: Date,
        public uid: string,
    ) { }
    // The token property is a getter that checks if the token is valid and not expired before returning it.
    get token(): string | null {
        if (!this._token || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}