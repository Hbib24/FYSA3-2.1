import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-worker-profile',
  templateUrl: './worker-profile.component.html',
  styleUrls: ['./worker-profile.component.css'],
})
export class WorkerProfileComponent implements OnInit {
  err: boolean = false;
  profs: [] = [];
  edit: boolean = false;
  username: string = 'Username';
  firstname: string = 'Firstname';
  lastname: string = 'Lastname';
  email: string = 'Email';
  phone: string = 'Phone';
  location: string = 'Location';
  profselect: String = 'Plumber';
  info: string = 'Additional info';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/profs').subscribe((res: []) => {
      this.profs = res;
      console.log(this.profs);
    });
  }

  toggleEdit() {
    this.edit = !this.edit;
  }
  submit() {
    if (
      !this.username ||
      !this.firstname ||
      !this.lastname ||
      !this.email ||
      !this.phone ||
      !this.info
    ) {
      return (this.err = true);
    }
    var obj = {
      username: this.username,
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      phone: parseInt(this.phone),
      location: this.location,
      infos: this.info,
      prof: '',
    };
    for (var prof of this.profs) {
      if (prof['name'] === this.profselect) {
        obj.prof = prof['_id'];
        break;
      }
    }

    this.http
      .put(`http://localhost:3000/worker/5fdf4ec4f8160550344eec2e`, obj)
      .subscribe((res) => {
        console.log(res);
        this.toggleEdit();
      });
  }
}
