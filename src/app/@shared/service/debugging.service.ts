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
export class DebuggingService {

    private ROOT_URL: string = environment.apiUrl;
    private robotModeData = new BehaviorSubject<string>(null);
    private robotStateData = new BehaviorSubject<string>(null);

    current_robot_mode_data = this.robotModeData.asObservable();
    current_robot_state_data = this.robotStateData.asObservable();

    constructor(private _http: Http) { }

    getRobotMode() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'robot_mode/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('GET ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('GET ROBOT MODE ERROR 500 Internal Server');
                }

                return { 'status': 'error', 'error': error.status };

            });

    }

    getRobotState() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.get(this.ROOT_URL + 'robot_state/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('GET ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('GET ROBOT MODE ERROR 500 Internal Server');
                }

                return { 'status': 'error', 'error': error.status };

            });

    }

    getSystemRestartInfo() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const return_object = [];

        return this._http.get(this.ROOT_URL + 'device/get_system_restart/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                _.each(response_object, (obj) => {
                    if (obj['enable'] === '1') {
                        obj['enable'] = true;
                    } else {
                        obj['enable'] = false;
                    }
                    return_object.push({
                        'day': obj['day'],
                        'datetime': new Date(obj['datetime']).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                        'enable': obj['enable']
                    });
                });

                return return_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('GET ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('GET ROBOT MODE ERROR 500 Internal Server');
                }

                return { 'status': 'error', 'error': error.status };

            });

    }

    changeSystemRestartStatus(day: string, enable: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'day': day, 'enable': enable };

        return this._http.post(this.ROOT_URL + 'device/enable_restart/index.php', { headers: headers, params: params })
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

    changeSystemRestartDatetime(day: string, hour: number, minute: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'day': day, 'hour': hour, 'minute': minute };
        return this._http.post(this.ROOT_URL + 'device/set_restart_time/index.php', { headers: headers, params: params })
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

    changeRobotMode(mode: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'mode': mode };

        return this._http.post(this.ROOT_URL + 'robot_mode/index.php', { headers: headers, params: params })
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

    sendRandom(action: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'action': action };

        return this._http.post(this.ROOT_URL + 'random/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                // console.log(response_object);

                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('POST CHANGE ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('POST CHANGE ROBOT MODE ERROR 500 Internal Server');
                }

            });

    }

    sendRestartSystem(username: string, timestamp: any, action: string) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'username': username, 'timestamp': timestamp, 'action': action };

        console.log(params);

        return this._http.post(this.ROOT_URL + 'device/add_shutdown/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                // console.log(response_object);

                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('POST CHANGE ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('POST CHANGE ROBOT MODE ERROR 500 Internal Server');
                }

            });

    }

    randomWithCondition(action: string, condition_number: number, probability: number) {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });
        const params = { 'action': action, 'condi': condition_number, 'prop': probability };

        return this._http.post(this.ROOT_URL + 'random/condition/index.php', { headers: headers, params: params })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                // console.log(response_object);
                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('POST CHANGE ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('POST CHANGE ROBOT MODE ERROR 500 Internal Server');
                }

            });

    }

    clearDatabase() {

        const headers: any = new Headers({ 'Content-Type': 'application/json' });
        const options: any = new RequestOptions({ headers: headers });

        return this._http.post(this.ROOT_URL + 'clear_database/index.php', { headers: headers })
            .toPromise().then((response: any) => {
                const response_object = JSON.parse(response._body);

                // console.log(response_object);
                return response_object;

            }).catch((error: any) => {

                if (error.status && error.status !== 0) {
                    console.error('POST CHANGE ROBOT MODE ERROR ' + error.status, Observable.throw(new Error(error.status)));

                } else {
                    console.error('POST CHANGE ROBOT MODE ERROR 500 Internal Server');
                }

            });

    }

    fetchRobotMode(robot_mode: string) {

        this.robotModeData.next(robot_mode);

    }

    fetchRobotState(robot_state: string) {

        this.robotStateData.next(robot_state);

    }

}
