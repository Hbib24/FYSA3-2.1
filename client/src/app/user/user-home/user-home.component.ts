import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient
  ) {
    this.getConfig();
  }

  order(x) {
    console.log(x);
  }

  getConfig() {
    this.http
      .get('http://localhost:3000/worker/offer')
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          data[i]['cols'] = 1;
          data[i]['rows'] = 1;
        }
        console.log(data);
        this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
          map(({ matches }) => {
            if (matches) {
              return data;
            }

            return data;
          })
        );
      });
  }
}
