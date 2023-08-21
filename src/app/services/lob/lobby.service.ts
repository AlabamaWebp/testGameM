import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient, private errors: SharedService) { }

  // get_count_player_in_lobby(){
  //   return this.http.get<any>(this.url);
  // }

  url = this.errors.getUrl();

  getReadyPlayers(room: string) {
    return this.http.get<any>(this.url + "/game/ready_status?room=" + room);
  }
  setReady(player: string, room: string, bool: boolean) {
    return this.http.post<any>(this.url + `/game/ready?player=${player}&room=${room}&ready=` + bool, undefined);
  }
  setSex(player: string, room: string, bool: boolean) {
    return this.http.get<any>(this.url + "/game/set_sex?player=" + player + "&room=" + room + "&woman=" + bool);
  }
  roomOut(room: string, player: string) {
    return this.http.post(this.url + `/rooms/out_room?room=${room}&nickname=${player}`, undefined)
  }
  checkStatus(player: string) {
    return this.http.get(this.url + "/game/lobby_status?name=" + player)
  }
}
