import { AuthenticationService } from './../../../@shared/service/authentication.service';
import { Component, OnDestroy, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-countdown-timer',
  template: `
                <div mat-dialog-content class="container">
                <p>Restarting in ..</p>
                <p>{{ this.message }}</p>
                </div>
                <div class="overlay_page">&nbspdd</div>
            `,
  styles: [`
                .container {
                    width: 250px;
                }
                p {
                  text-align: center;
                }

                .overlay_page {
                  background-color: rgba(0, 0, 0, 0.8);
                  z-index: 999;
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100vw;
                  height: 100vh;
                  opacity: 0;
              }​
            `],
})
export class CountdownTimerComponent{

  constructor(
    public dialogRef: MatDialogRef<CountdownTimerComponent>,
    private _authenticationService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  intervalId = 0;
  message = '';
  seconds = 10;

  clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnInit() {
    this.start();
    console.log('on itnit')
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  start() {
    this.countDown();

  }
  stop() {
    this.clearTimer();
    //window.location.reload();
    this.logout();
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Shutdown!';
        this.stop();
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `${this.seconds}`;
      }
    }, 1000);
  }

  logout() {

    localStorage.removeItem('userData');
    this._authenticationService.fetchUser(null);
    window.location.href = '../../login';
    // this.router.navigate(['/your-path']);
    // window.top.close();

  }

}