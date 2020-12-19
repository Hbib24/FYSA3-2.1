import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.css'],
})
export class WorkerFormComponent implements OnInit {
  constructor(private http: HttpClient) {}
  dates: any = [];
  error: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {}

  submit(data) {
    if (
      !data.form.value.title ||
      !data.form.value.desc ||
      this.dates.length === 0
    ) {
      this.error = true;
      return;
    }
    var obj = {
      title: data.form.value.title,
      desc: data.form.value.desc,
      dates: this.dates,
    };
    this.http
      .post('http://localhost:3000/worker/offer', obj)
      .subscribe((res) => {
        this.error = false;
        this.submitted = true;
        console.log(res);
      });
  }

  addDate(data) {
    var obj = {
      day: data.form.value.days,
      from: data.form.value.from,
      to: data.form.value.to,
    };
    for (var key in obj) {
      if (!obj[key]) {
        this.error = true;
        return;
      }
    }
    this.dates.push(obj);
  }
}