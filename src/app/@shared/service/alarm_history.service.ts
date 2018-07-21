import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

// Reactive
import { Observable } from 'rxjs';

// Third-Party
import * as _ from 'lodash';

import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AlarmHistoryService {

    private ROOT_URL: string = environment.apiUrl;

    constructor(private _http: Http) { }

    getAlarmHistory() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const return_object = [];

        return this._http.get(this.ROOT_URL + 'log/alarm/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                _.each(response_object, (obj) => {

                    return_object.push({
                        'east': obj['east'],
                        'east_desc': obj['east_desc'],
                        'west': obj['west'],
                        'west_desc': obj['west_desc'],
                        'action': obj['action'],
                        'err_id': obj['err_id'],
                        'err_desc': obj['err_desc'],
                        'timestamp': new Date(obj['timestamp'])
                    });
                });

                return return_object;

            }).catch((error: any) => {
                // ERROR FROM SERVER
                if (error.status && error.status !== 0) {
                    console.error('GET CONNECTION HISTORY ERROR ' + error.status, Observable.throw(new Error(error.status)));
                    return ({ status: 'error', error: 'ERROR ' + error.status });

                    // ERROR FROM CLIENT
                } else {
                    console.error('GET CONNECTION HISTORY ERROR 500 Internal Server');
                    return ({ status: 'error', error: 'ERROR 500' });
                }

            });



    }
}