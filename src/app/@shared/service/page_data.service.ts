import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PageDataService {

    private focusPage = new BehaviorSubject<boolean>(false);

    focus_page = this.focusPage.asObservable();

    changeFocusPage(focus: boolean) {
        // this.focusPage.next(focus);
        console.log(focus);
    }
}