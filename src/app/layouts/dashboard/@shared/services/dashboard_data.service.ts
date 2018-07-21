import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DashboardDataService {

    private portSource = new BehaviorSubject<any>(null);
    private unvailablePortSource = new BehaviorSubject<any>(null);
    private unavailableEastPortSource = new BehaviorSubject<any>(null);
    private unavailableWestPortSource = new BehaviorSubject<any>(null);
    private connectionHistorySource = new BehaviorSubject<any>(null);
    private eastportSource = new BehaviorSubject<any>(null);
    private westportSource = new BehaviorSubject<any>(null);
    private eastDescSource = new BehaviorSubject<any>(null);
    private westDescSoruce = new BehaviorSubject<any>(null);
    private operationSoruce = new BehaviorSubject<any>(
        {
            'status': 'Idle',
            'error': null,
            'action': 'No data',
            'east': 'No data',
            'west': 'No data',
            'progress': 'No data',
            'operation_time': 'No data'
        });
    private sequenceSource = new BehaviorSubject<any>(null);

    private selectedEast = new BehaviorSubject<any>(null);
    private selectedWest = new BehaviorSubject<any>(null);
    private selectedPair = new BehaviorSubject<any>(null);
    private operationTime = new BehaviorSubject<number>(0);


    connected_port = this.portSource.asObservable();
    unavailable_port = this.unvailablePortSource.asObservable();
    unavailable_east_port = this.unavailableEastPortSource.asObservable();
    unavailable_west_port = this.unavailableWestPortSource.asObservable();
    connection_history = this.connectionHistorySource.asObservable();
    east_port_desc = this.eastDescSource.asObservable();
    west_port_desc = this.westDescSoruce.asObservable();
    connected_east_port = this.eastportSource.asObservable();
    connected_west_port = this.westportSource.asObservable();
    current_operation = this.operationSoruce.asObservable();
    sequence_data = this.sequenceSource.asObservable();

    current_selected_east = this.selectedEast.asObservable();
    current_selected_west = this.selectedWest.asObservable();
    current_selected_pair = this.selectedPair.asObservable();
    current_operation_time = this.operationTime.asObservable();

    constructor() { }

    changePair(pair_data: object) {

        this.selectedPair.next(pair_data);

    }

    changeSelectedEast(east_port: number) {

        this.selectedEast.next(east_port);
    }

    changeSelectedWest(west_port: number) {

        this.selectedWest.next(west_port);

    }

    fetchUnavailablePortData(unavailable_port_data) {

        this.unvailablePortSource.next(unavailable_port_data);

    }

    fetchUnavailableEastPortData(unavailable_east_port_data) {

        this.unavailableEastPortSource.next(unavailable_east_port_data);

    }

    fetchUnavailableWestPortData(unavailable_west_port_data) {

        this.unavailableWestPortSource.next(unavailable_west_port_data);

    }

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

    fetchOperation(operation_data: object) {

        this.operationSoruce.next(operation_data);

    }

    fetchSequence(sequence_data: object) {

        this.sequenceSource.next(sequence_data);

    }

    fetchConnectionHistory(connection_history_data: object) {

        this.connectionHistorySource.next(connection_history_data);

    }

    updateOperationTime(operation_time: number) {

        this.operationTime.next(operation_time);

    }

}
