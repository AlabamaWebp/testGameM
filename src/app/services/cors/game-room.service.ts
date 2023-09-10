import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';
import { PlayerService } from '../player/player.service';

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {


  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private player: PlayerService,
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
