import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    private portSource = new BehaviorSubject<any>(null);
    private eastportSource = new BehaviorSubject<any>(null);
    private westportSource = new BehaviorSubject<any>(null);
    private eastDescSource = new BehaviorSubject<any>(null);
    private westDescSoruce = new BehaviorSubject<any>(null);

    private currentEastPortSource = new BehaviorSubject<number>(null);
    private currentWestPortSource = new BehaviorSubject<number>(null);
    private currentSelectEastPortDescSource = new BehaviorSubject<string>(null);
    private currentSelectWestPortDescSource = new BehaviorSubject<string>(null);

    connected_port = this.portSource.asObservable();
    connected_east_port = this.eastportSource.asObservable();
    connected_west_port = this.westportSource.asObservable();
    east_port_desc = this.eastDescSource.asObservable();
    west_port_desc = this.westDescSoruce.asObservable();

    current_eastPort = this.currentEastPortSource.asObservable();
    current_westPort = this.currentWestPortSource.asObservable();
    current_eastDesc = this.currentSelectEastPortDescSource.asObservable();
    current_westDesc = this.currentSelectWestPortDescSource.asObservable();

    constructor() { }

    fetchPortData(port_data: any) {

        this.portSource.next(port_data);

    }

    fetchEastPortData(east_port_data: number[]) {

        this.eastportSource.next(east_port_data);

    }

    fetchWestPortData(west_port_data: number[]) {

        this.westportSource.next(west_port_data);

    }

    fetchEastPortDesc(east_port_desc: string[]) {

        this.eastDescSource.next(east_port_desc);

    }

    fetchWestPortDesc(west_port_desc: string[]) {

        this.westDescSoruce.next(west_port_desc);

    }

    changeEastPort(east_port: number) {

        this.currentEastPortSource.next(east_port);

    }

    changeWestPort(west_port: number) {

        this.currentWestPortSource.next(west_port);

    }

    changeEastDesc(east_desc: string) {

        this.currentSelectEastPortDescSource.next(east_desc);

    }

    changeWestDesc(west_desc: string) {

        this.currentSelectWestPortDescSource.next(west_desc);

    }

}
