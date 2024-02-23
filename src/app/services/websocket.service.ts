import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
// getLobbys setName createLobby deleteLobby roomIn
// statusName refreshRooms statusCreate
export class WebsocketService {
  private socket: Socket | undefined;

  constructor() {}

  isConnect() {
    return this.socket ? true : false;
  }
  private connect() {
    // if (this.socket)
    //   this.socket.disconnect();
    this.socket = io('http://localhost:3001');
    // this.socket.on("disconnect", (reason) => {
    //   if (reason === "io server disconnect") {
    //     // the disconnection was initiated by the server, you need to reconnect manually
    //     this.socket?.connect();
    //   }
    //   // else the socket will automatically try to reconnect
    // });
  }
  events = new Set();
  on(eventName: string, callback: any) {
    this.isConnect() ? 0 : this.connect();
    if (!this.events.has(eventName)) {
      this.events.add(eventName);
      this.socket?.on(eventName, callback);
    }
  }

  emit(eventName: string, data: any) {
    this.isConnect() ? 0 : this.connect();
    this.socket?.emit(eventName, data);
  }

}