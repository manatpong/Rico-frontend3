import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MenuDataService {

    constructor() { }

    private menuSource = new BehaviorSubject<any>('dashboard');

    current_seleted_menu = this.menuSource.asObservable();

    updateSelectedMenu(menu: string) {

        this.menuSource.next(menu);

    }

}
