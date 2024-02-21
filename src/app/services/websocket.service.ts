import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: Socket | undefined;

  constructor() {}

  connect() {
    this.socket = io('http://localhost:3001');
  }

  public on(eventName: string, callback: any) {
    this.socket?.on(eventName, callback);
  }

  public emit(eventName: string, data: any) {
    this.socket?.emit(eventName, data);
  }

}
interface refreshRooms {
  name: string,
  creator: boolean,
  players: any[],
  maxPlayers: number,
  canIn: boolean
}