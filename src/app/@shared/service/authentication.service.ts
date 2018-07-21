import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs';

// Reactive
import { Observable } from 'rxjs';

// Environment
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    constructor(private _http: Http) { }

    private ROOT_URL: string = environment.apiUrl;
    private userData = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('userData')));

    current_user_data = this.userData.asObservable();
    remember_user_data = JSON.parse(localStorage.getItem('userData'));

    login(username: string, password: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'username': username, 'password': password };

        return this._http.post(this.ROOT_URL + 'auth/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                console.log(response_object);

                return response_object;

            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('POST LOGIN ERROR ' + error.status, Observable.throw(new Error(error.status)));

                    // ERROR FROM CLIENT
                } else {
                    console.error('POST LOGIN 500 Internal Server');
                }

            });

    }

    getUser() {

        const return_data = { 'username': null, 'level': null };

        if (this.current_user_data !== null) {
            return_data['username'] = this.current_user_data['username'];
            return_data['level'] = this.current_user_data['level'];
        }

        if (this.remember_user_data !== null) {
            return_data['username'] = this.remember_user_data['username'];
            return_data['level'] = this.remember_user_data['level'];
        }

        return return_data;

    }

    fetchUser(user_data: object) {

        this.userData.next(user_data);

    }

}
