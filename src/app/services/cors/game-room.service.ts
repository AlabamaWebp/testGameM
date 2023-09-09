import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';
import { PlayerService } from '../player/player.service';
// import { IWsMessage, WebsocketService } from 'src/app/websocket';
import { Observable } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {


  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private player: PlayerService,
    // private wsService: WebsocketService
  ) { }

  // websubject = webSocket("ws://" + this.shared.getUrlWithoutHttp() + "/game/game?game_room=" + this.player.getRoomIn().name);
  // getData() {
  //   return this.websubject
  // }
  // sendData(data: any) {
  //   // this.websubject.subscribe();
  //   this.websubject.next(data);
  //   // this.websubject.complete();
  // }
  getTest() {
    return this.http.get(this.shared.getUrl() + "/game/test");
  }

}
