import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';
import { PlayerService } from '../player/player.service';
// import { IWsMessage, WebsocketService } from 'src/app/websocket';
import { Observable } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import * as WebSocket from 'ws'

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
    this.socket$ = webSocket("ws://" + this.shared.getUrlWithoutHttp() + "/game/game?game_room=" + this.player.getRoomIn().name); // здесь указывается URL Вашего WebSocket сервера
  }

  // websubject = webSocket("ws://" + this.shared.getUrlWithoutHttp() + "/game/game?game_room=" + this.player.getRoomIn().name);
  // getData() {
  //   return this.websubject
  // }
  // sendData(data: any) {
  //   // this.websubject.subscribe();
  //   this.websubject.next(data);
  //   // this.websubject.complete();
  // }
  // getTest() {
  //   return this.http.get(this.shared.getUrl() + "/game/test");
  // }

  private socket$: WebSocketSubject<any>;

  public connect() {
    return this.socket$
  }

  public disconnect(): void {
    this.socket$.complete();
  }

  public sendMessage(message: any): void {
    this.socket$.next(message);
  }

}
