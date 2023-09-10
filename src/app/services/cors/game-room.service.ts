import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';
import { RoomService } from '../player/player.service';

@Injectable({
  providedIn: 'root'
})
export class GameRoomService {

  // НЕ ИСПОЛЬЗУЕТСЯ

  constructor(
    private http: HttpClient,
    private shared: SharedService,
    private player: RoomService,
  ) { 
  }
  checkRoom() {
    return this.http.get(this.shared.getUrl() + "/game/check?name=" + this.shared.getName())
  }

}
