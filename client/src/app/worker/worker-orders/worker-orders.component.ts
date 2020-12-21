import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  WorkerOrdersDataSource,
  WorkerOrdersItem,
} from './worker-orders-datasource';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-worker-orders',
  templateUrl: './worker-orders.component.html',
  styleUrls: ['./worker-orders.component.css'],
})
export class WorkerOrdersComponent implements AfterViewInit, OnInit {
  constructor(private http: HttpClient) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<WorkerOrdersItem>;
  dataSource: WorkerOrdersDataSource;
  data: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'user', 'info', 'date', 'state', 'location'];

  ngOnInit() {
    this.dataSource = new WorkerOrdersDataSource();
    // this.http.get('http://localhost:3000/orders').subscribe((res) => {
    //   this.data = res;
    //   console.log(res);
    // });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
