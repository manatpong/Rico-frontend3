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
export class ConnectionQueueService {

    private ROOT_URL: string = environment.apiUrl;

    constructor(private _http: Http) { }

    getQueue() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const return_object = [];

        return this._http.get(this.ROOT_URL + 'log/queue_request/index.php?action=0', { headers: headers })
            .toPromise().then((response: any) => {

                const response_object = JSON.parse(response._body);

                _.each(response_object, (obj) => {

                    return_object.push({
                        'id': obj['id'],
                        'queue': obj['queue'],
                        'east': obj['east'],
                        'east_desc': obj['east_desc'],
                        'west': obj['west'],
                        'west_desc': obj['west_desc'],
                        'action': obj['action'],
                        'timestamp': new Date(obj['timestamp']),
                        'requester': obj['requester'],
                        'status': obj['status'],
                        'approver': obj['approver']
                    });

                });

                return return_object;

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

    getAprroveQueue() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const return_object = [];

        return this._http.get(this.ROOT_URL + 'log/queue_request/index.php?action=1', { headers: headers })
            .toPromise().then((response: any) => {

                const response_object = JSON.parse(response._body);

                _.each(response_object, (obj) => {

                    return_object.push({
                        'id': obj['id'],
                        'queue': obj['queue'],
                        'east': obj['east'],
                        'east_desc': obj['east_desc'],
                        'west': obj['west'],
                        'west_desc': obj['west_desc'],
                        'action': obj['action'],
                        'timestamp': new Date(obj['timestamp']),
                        'requester': obj['requester'],
                        'status': obj['status'],
                        'approver': obj['approver']
                    });

                });

                return return_object;

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

    addQueue(east: number, west: number, action: string, username: string, datetime: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'east': east, 'west': west, 'action': action, 'username': username, 'start_time': datetime };

        return this._http.post(this.ROOT_URL + 'queue/request/index.php', { headers: headers, params: params })
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

    approveQueue(request_id: number, approver: string, approve_status: number, remark: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'request_id': request_id, 'approver': approver, 'approve_status': approve_status, 'remark': remark };

        return this._http.post(this.ROOT_URL + 'queue/approve/index.php', { headers: headers, params: params })
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

}
