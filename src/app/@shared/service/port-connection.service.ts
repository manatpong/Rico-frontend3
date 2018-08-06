// ANGULAR MODULE
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';

// Reactive
import { Observable } from 'rxjs';

// Third-Party
import * as _ from 'lodash';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PortConnectionService {

    private ROOT_URL: string = environment.apiUrl;

    constructor(private _http: Http) { }

    // GET CONNECTION HISTORYS
    createConnection(east: number, west: number, action: string, username: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'east': east, 'west': west, 'action': action, 'username': username };

        return this._http.post(this.ROOT_URL + 'queue/add/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                // const response_object = JSON.parse(response._body);
                console.log(response);
                // return response_object;

            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('POST CONNECTION ERROR ' + error.status, Observable.throw(new Error(error.status)));

                    // ERROR FROM CLIENT
                } else {
                    console.error('POST CONNECTION HISTORY ERROR 500 Internal Server');
                }

            });

    }

    errorReset(code: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'code': code };

        return this._http.post(this.ROOT_URL + 'resume_sequence_error/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                // const response_object = JSON.parse(response._body);
                // console.log(response);
                // return response_object;
            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('POST CONNECTION ERROR ' + error.status, Observable.throw(new Error(error.status)));

                    // ERROR FROM CLIENT
                } else {
                    console.error('POST CONNECTION HISTORY ERROR 500 Internal Server');
                }

            });

    }

    clearOperation(action: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'action': action };

        return this._http.post(this.ROOT_URL + 'cancel_sequence_error/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                console.log(response_object);

                // return response_object;
            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('POST CONNECTION ERROR ' + error.status, Observable.throw(new Error(error.status)));

                    // ERROR FROM CLIENT
                } else {
                    console.error('POST CONNECTION HISTORY ERROR 500 Internal Server');
                }

            });

    }

    getSequences() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'sequence_detail/index.php', { headers: headers }).toPromise().then((response: any) => {
            const response_object = JSON.parse(response._body);

            if (!_.find(response_object, ['result', '-1'])) {
                if (!_.find(response_object, ['result', '0'])) {
                    return response_object;
                } else {
                    const index = _.findLastIndex(response_object, ['result', '1']);
                    response_object[index]['result'] = '2';
                    return response_object;
                }
            } else {
                return response_object;
            }

        }).catch((error: any) => {
            // ERROR FROM SERVER
            if (error.status && error.status !== 0) {
                console.error('GET CONNECTED PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                return ({ status: 'error', error: 'ERROR ' + error.status });

                // ERROR FROM CLIENT
            } else {
                console.error('GET CONNECTED PORT ERROR 500 Internal Server');
                return ({ status: 'error', error: 'ERROR 500' });
            }

        });

    }

    selectPort(username: string, position: string, no: any, unlock_time: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = {"username": username,"position" : position,"no": no,"unlock_time": unlock_time};

        return this._http.post(this.ROOT_URL + 'ports/port_reserved/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                console.log(response_object);

                return response_object;
            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('POST CONNECTION ERROR ' + error.status, Observable.throw(new Error(error.status)));

                    // ERROR FROM CLIENT
                } else {
                    console.error('POST CONNECTION HISTORY ERROR 500 Internal Server');
                }

            });

    }

}
