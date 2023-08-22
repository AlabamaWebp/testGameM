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
    private player: PlayerService
  ) { }

  getData() {
    return this.http.get(this.shared.getUrl() + "/game/game?room=" + this.player.getRoomIn().name)
  }
  getTest() {
    return this.http.get(this.shared.getUrl() + "/game/test")
  }
}
