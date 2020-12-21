import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-offers',
  templateUrl: './worker-offers.component.html',
  styleUrls: ['./worker-offers.component.css'],
})
export class WorkerOffersComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards: any;
  getConfig() {
    this.http
      .get(`http://localhost:3000/worker/offer/5fdf4ec4f8160550344eec2e`)
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

  delete(id) {
    this.http
      .delete(`http://localhost:3000/worker/offer/${id}`)
      .subscribe(() => {
        location.reload();
      });
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
    private router: Router
  ) {
    this.getConfig();
  }
}
