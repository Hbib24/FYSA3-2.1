import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  err: boolean = false;
  edit: boolean = false;
  username: string = 'Username';
  firstname: string = 'Firstname';
  lastname: string = 'Lastname';
  email: string = 'Email';
  phone: string = 'Phone';
  location: string = 'Location';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  toggleEdit() {
    this.edit = !this.edit;
  }
  submit() {
    if (
      !this.username ||
      !this.firstname ||
      !this.lastname ||
      !this.email ||
      !this.phone
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
    };

    this.http
      .put(`http://localhost:3000/user/update/5fe0a40cbf54716db881caad`, obj)
      .subscribe((res) => {
        console.log(res);
        this.toggleEdit();
      });
  }
}
