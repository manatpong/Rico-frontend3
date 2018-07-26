import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Third-Party
import * as _ from 'lodash';

// Environment
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SmtpConfigurationService {

    private ROOT_URL: string = environment.apiUrl;

    constructor(private _http: Http) { }

    getSmtpSetting() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'device/get_smtp_setting/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;
                // console.log(response_object);

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('GET ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('GET ROBOT MODE ERROR 500 Internal Server');
                }

                return { 'status': 'error', 'error': error.status };

            });
    }

    sendSettingSMTP(sv_name: string, set_port: number, set_username: string, set_password: string, set_auth: number, set_tls: number, set_ssl: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        const params = { 'sv_name': sv_name, 'set_port': set_port, 'set_username': set_username, 'set_password': set_password, 'set_auth': set_auth, 'set_tls': set_tls, 'set_ssl': set_ssl };

        return this._http.post(this.ROOT_URL + 'device/set_smtp/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('POST CHANGE ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('POST CHANGE ROBOT MODE ERROR 500 Internal Server');
                }

            });

    }

    getSmtpAlert() {
        
        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'device/get_smtp_alert/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;
                // console.log(response_object);

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('GET ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('GET ROBOT MODE ERROR 500 Internal Server');
                }

                return { 'status': 'error', 'error': error.status };

            });
    }

    getUserSmtpAlert() {
        
        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'device/get_user_smtp_alert/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;
                // console.log(response_object);

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('GET ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('GET ROBOT MODE ERROR 500 Internal Server');
                }

                return { 'status': 'error', 'error': error.status };

            });
    }

    sendSettingAlert(username: string, level: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        const params = { 'username': username, 'level': level };

        return this._http.post(this.ROOT_URL + 'device/set_smtp_alert/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('POST CHANGE ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('POST CHANGE ROBOT MODE ERROR 500 Internal Server');
                }

            });

    }
}