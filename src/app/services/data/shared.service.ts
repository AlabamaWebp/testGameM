import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private url: string = "192.168.0.1:78"
  getUrl() {
    return this.url;
  }
  setUrl(value: string) {
    this.url = value;
    localStorage.setItem("ip", value);
  }
  private nickname: string = ""
  getName() {
    return this.nickname;
  }
  setName(value: string) {
    this.nickname = value;
    localStorage.setItem("name", value);
  }
}
