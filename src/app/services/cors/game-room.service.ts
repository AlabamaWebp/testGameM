import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';
import { PlayerService } from '../player/player.service';
// import { IWsMessage, WebsocketService } from 'src/app/websocket';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
// import * as WebSocket from 'ws'

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {


  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private player: PlayerService,
    // private wsService: WebsocketService
  ) { 
  }
  socket: any

  connect(str: string) {
    this.socket = new WebSocket(str);

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    // this.socket.onmessage = (event: any) => {
    //   console.log('Received message:', event.data);
    // };
    this.socket.onclose = (event: any) => {
      console.log('WebSocket connection closed:', event);
    };
    this.socket.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };
    return this.socket
  }
  sendMessage(message: any): void {
    this.socket.send(JSON.stringify(message));
  }

  closeConnection(): void {
    this.socket.close();
  }

}
