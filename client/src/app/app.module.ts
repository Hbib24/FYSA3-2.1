import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { WorkerComponent } from './worker/worker.component';
@NgModule({
  declarations: [AppComponent, UserComponent, AdminComponent, WorkerComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
