import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { WorkerFormComponent } from './worker-form/worker-form.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { WorkerNavComponent } from './worker-nav/worker-nav.component';
import { WorkerHomeComponent } from './worker-home/worker-home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { WorkerOffersComponent } from './worker-offers/worker-offers.component';
import { WorkerProfileComponent } from './worker-profile/worker-profile.component';

const routes: Routes = [
  {
    path: '',
    component: WorkerHomeComponent,
  },
  {
    path: 'worker/post',
    component: WorkerFormComponent,
  },
  {
    path: 'worker/offers',
    component: WorkerOffersComponent,
  },
  {
    path: 'worker/profile',
    component: WorkerProfileComponent,
  },
];

@NgModule({
  declarations: [
    WorkerNavComponent,
    WorkerFormComponent,
    WorkerHomeComponent,
    WorkerOffersComponent,
    WorkerProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  exports: [RouterModule, WorkerNavComponent],
})
export class RoutingModule {}
