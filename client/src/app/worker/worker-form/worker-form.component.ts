import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-form',
  templateUrl: './worker-form.component.html',
  styleUrls: ['./worker-form.component.css'],
})
export class WorkerFormComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}
  dates: any = [];
  error: boolean = false;

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
      worker_id: '5fdf4ec4f8160550344eec2e',
      title: data.form.value.title,
      desc: data.form.value.desc,
      dates: this.dates,
    };
    this.http
      .post('http://localhost:3000/worker/offer', obj)
      .subscribe((res) => {
        this.error = false;
        this.router.navigate(['/worker/offers']);
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
