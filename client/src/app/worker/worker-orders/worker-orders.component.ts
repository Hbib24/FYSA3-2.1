import { Routes } from '@angular/router';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'worker-orders',
  styleUrls: ['worker-orders.component.css'],
  templateUrl: 'worker-orders.component.html',
})
export class WorkerOrdersComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'user',
    'location',
    'info',
    'date',
    'state',
    'action',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>();
  constructor(private http: HttpClient) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getuser();
  }

  action(id, state) {
    this.http
      .put('http://localhost:3000/api/order/update', {
        id: id,
        state: state,
      })
      .subscribe((data) => {
        this.getuser();
      });
  }
  getuser() {
    this.http.get('http://localhost:3000/orders').subscribe((data: []) => {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        res.push({
          user: data[i]['user']['username'],
          location: data[i]['location'],
          info: data[i]['info'],
          date: data[i]['date'],
          state: data[i]['state'],
          _id: data[i]['_id'],
        });
      }
      var sour: PeriodicElement[] = res;
      this.dataSource = new MatTableDataSource<PeriodicElement>(sour);
    });
  }
}

export interface PeriodicElement {
  user: String;
  location: string;
  info: String;
  date: String;
  state: string;
  _id: string;
}
