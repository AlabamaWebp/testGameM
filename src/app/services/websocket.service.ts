import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
// getLobbys setName createLobby deleteLobby roomIn
// statusName refreshRooms statusCreate statusDelete
export class WebsocketService {
  private socket: Socket | undefined;

  constructor(private http: HttpClient, private router: Router) { 
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.unsubscribe();
      }
    })
  }

  isConnect() {
    return this.socket ? true : false;
  }
  connect(name: string | undefined = undefined) {
    if (name == undefined) {
      const tmp = localStorage.getItem("nickname")
      if (!tmp || tmp?.length == 0) {
        console.log("nonick");
        return
      }
      else {
        name = tmp;
      }
    }
    this.socket = io('http://localhost:3001', {
      extraHeaders: { "name": name }
    });
  }
  disconnect() {
    this.events.clear();
    this.socket?.close();
  }
  events = new Set<string>();
  on(eventName: string, callback: any) {
    this.isConnect() ? 0 : this.connect();
    if (!this.isConnect())
      return
    if (!this.events.has(eventName)) {
      this.events.add(eventName);
      this.socket?.on(eventName, callback);
    }
  }

  emit(eventName: string, data: any = undefined) {
    this.isConnect() ? 0 : this.connect();
    if (!this.isConnect())
      return
    this.socket?.emit(eventName, data);
  }
  unsubscribe() {
    this.events.forEach((el: string) => {
      this.socket?.off(el)
    })
    this.events.clear();
  }

  checkNickname(nickname: string) {
    return this.http.post("http://localhost:3000/nickname", {nickname: nickname});
  }

}