import { BrowserModule } from '@angular/platform-browser';
import { RoutingModule } from './worker/worker.routing.module';
import { NgModule, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';

import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { WorkerComponent } from './worker/worker.component';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent, UserComponent, AdminComponent, WorkerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
