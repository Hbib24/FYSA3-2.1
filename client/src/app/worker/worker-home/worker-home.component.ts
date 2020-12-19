import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-worker-home',
  templateUrl: './worker-home.component.html',
  styleUrls: ['./worker-home.component.css'],
})
export class WorkerHomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 1, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient
  ) {
    this.getConfig();
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
