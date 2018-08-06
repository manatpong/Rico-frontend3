import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DebuggingDataService {

    private totalQueue = new BehaviorSubject<number>(null)
    private autoRandomActive = new BehaviorSubject<boolean>(false);
    

    total_queue = this.totalQueue.asObservable();
    auto_active = this.autoRandomActive.asObservable();

    fetchTotalQueue(total_queue: number) {
        this.totalQueue.next(total_queue);
    }

    getAutoRandom(auto_active: boolean) {
        this.autoRandomActive.next(auto_active);
    }

    
}