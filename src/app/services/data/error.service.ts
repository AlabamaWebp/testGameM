import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  private count = 0;
  getCount() {
    return this.count++;
  }


  private url: string = "192.168.0.1:8081"
  getUrl() {
    return this.url;
  }
  setUrl(value: string) {
    this.url = value;
    localStorage.setItem("ip", value);
  }

  public errorsIn$ = new Subject<any>();
}
