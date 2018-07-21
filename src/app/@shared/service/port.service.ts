// ANGULAR MODULE
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, ResponseContentType } from '@angular/http';

// Reactive
import { Observable } from 'rxjs';

// Third-Party
import * as _ from 'lodash';

// Environment
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PortService {

    private ROOT_URL: string = environment.apiUrl;

    constructor(private _http: Http) { }

    getConnectedPort() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const return_object = [];

        return this._http.get(this.ROOT_URL + 'log/current_connection/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                _.each(response_object, (obj) => {
                    return_object.push({
                        'east': Number(obj['east']),
                        'east_desc': obj['east_desc'],
                        'west': Number(obj['west']),
                        'west_desc': obj['west_desc'],
                    });
                });

                return return_object;

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

    getEastDescription() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params: object = { 'action': 'get_port_description', 'port_direction': 'east' };

        return this._http.get(this.ROOT_URL + 'ports/index.php', { headers: headers, params: params }).toPromise().then((response: any) => {
            const response_object = JSON.parse(response._body);

            return response_object;

        }).catch((error: any) => {
            // ERROR FROM SERVER
            if (error.status && error.status !== 0) {
                console.error('GET EAST DESCRIPTION CONNECTED PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                return ({ status: 'error', error: 'ERROR ' + error.status });

                // ERROR FROM CLIENT
            } else {
                console.error('GET EAST DESCRIPTION CONNECTED PORT ERROR 500 Internal Server');
                return ({ status: 'error', error: 'ERROR 500' });
            }

        });

    }

    getWestDescription() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params: object = { 'action': 'get_port_description', 'port_direction': 'west' };

        return this._http.get(this.ROOT_URL + 'ports/index.php', { headers: headers, params: params }).toPromise().then((response: any) => {
            const response_object = JSON.parse(response._body);

            return response_object;

        }).catch((error: any) => {
            // ERROR FROM SERVER
            if (error.status && error.status !== 0) {
                console.error('GET WEST DESCRIPTION PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                return ({ status: 'error', error: 'ERROR ' + error.status });

                // ERROR FROM CLIENT
            } else {
                console.error('GET WEST DESCRIPTION PORT ERROR 500 Internal Server');
                return ({ status: 'error', error: 'ERROR 500' });
            }

        });

    }

    updateDescription(direction: string, port_number: number, description: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params: object = { 'direction': direction, 'port': port_number, 'description': description };

        return this._http.post(this.ROOT_URL + 'ports/edit_description/index.php', { headers: headers, params: params }).toPromise()
            .then((response: any) => {
                const response_object = JSON.parse(response._body);

                // console.log(response_object);

                return response_object;

            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('GET WEST DESCRIPTION PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                    return ({ status: 'error', error: 'ERROR ' + error.status });

                    // ERROR FROM CLIENT
                } else {
                    console.error('GET WEST DESCRIPTION PORT ERROR 500 Internal Server');
                    return ({ status: 'error', error: 'ERROR 500' });
                }

            });

    }

    getOperation() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });


        return this._http.get(this.ROOT_URL + 'operation/index.php', { headers: headers }).toPromise().then((response: any) => {
            const response_object = JSON.parse(response._body);

            const return_object = {
                'action': response_object['action'],
                'east': Number(response_object['east']),
                'west': Number(response_object['west']),
                'status': response_object['status'],
                'error': response_object['error'],
                'progress': response_object['progress'],
                'operation_time': response_object['operation_time'],
            };

            return return_object;

        }).catch((error: any) => {
            // ERROR FROM SERVER
            if (error.status && error.status !== 0) {
                console.error('GET OPERATION PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                return ({ status: 'error', error: 'ERROR ' + error.status });

                // ERROR FROM CLIENT
            } else {
                console.error('GET OPERATION PORT ERROR 500 Internal Server');
                return ({ status: 'error', error: 'ERROR 500' });
            }

        });

    }

    getUnavailablePort() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'action': 'unavailable_port' };
        const return_object = [];

        return this._http.get(this.ROOT_URL + 'ports/index.php?action=unavailable_port',
            { headers: headers, params: params }).toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                _.each(response_object, (obj) => {
                    return_object.push(Number(obj['port']));
                });

                return return_object;

            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('GET UNAVAILABLE PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                    return ({ status: 'error', error: 'ERROR ' + error.status });

                    // ERROR FROM CLIENT
                } else {
                    console.error('GET UNAVAILABLE PORT ERROR 500 Internal Server');
                    return ({ status: 'error', error: 'ERROR 500' });
                }

            });


    }

    getUnavailablePortSeparateDirection(direction: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'ports/unavailable/index.php?direction=' + direction,
            { headers: headers }).toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;

            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('GET UNAVAILABLE PORT ERROR ' + error.status, Observable.throw(new Error(error.status)));
                    return ({ status: 'error', error: 'ERROR ' + error.status });

                    // ERROR FROM CLIENT
                } else {
                    console.error('GET UNAVAILABLE PORT ERROR 500 Internal Server');
                    return ({ status: 'error', error: 'ERROR 500' });
                }

            });

    }


}
