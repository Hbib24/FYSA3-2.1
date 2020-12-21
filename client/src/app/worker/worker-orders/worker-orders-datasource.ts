import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface WorkerOrdersItem {
  id: number;
  user: string;
  info: string;
  date: string;
  state: string;
  location: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: WorkerOrdersItem[] = [
  {
    id: 1,
    user: 'Hydrogen',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 2,
    user: 'Helium',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 3,
    user: 'Lithium',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 4,
    user: 'Beryllium',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 5,
    user: 'Boron',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 6,
    user: 'Carbon',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 7,
    user: 'Nitrogen',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
  {
    id: 8,
    user: 'Oxygen',
    info: 'hello',
    date: 'yes',
    state: 'no',
    location: 'hi',
  },
];

/**
 * Data source for the WorkerOrders view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class WorkerOrdersDataSource extends DataSource<WorkerOrdersItem> {
  data: WorkerOrdersItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<WorkerOrdersItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: WorkerOrdersItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WorkerOrdersItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.user, b.user, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
