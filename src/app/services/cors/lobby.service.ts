import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../data/shared.service';
import { WebSocketServiceService } from '../websocket/web-socket-service.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient, private shar: SharedService, private socket: WebSocketServiceService) { }

  // get_count_player_in_lobby(){
  //   return this.http.get<any>(this.url);
  // }

  url = this.shar.getUrl();

  getReadyPlayers(room: string) {
    return this.http.get<any>(this.url + "/lobby/ready_status?room=" + room);
  }
  setReady(player: string, room: string, bool: boolean) {
    return this.http.post<any>(this.url + `/lobby/ready?player=${player}&room=${room}&ready=` + bool, undefined);
  }
  setSex(player: string, room: string, bool: boolean) {
    return this.http.get<any>(this.url + "/lobby/set_sex?player=" + player + "&room=" + room + "&woman=" + bool);
  }
  roomOut(room: string, player: string) {
    return this.http.post(this.url + `/lobby/out_room?room=${room}&nickname=${player}`, undefined)
  }
  connect(player: string) {
    return this.socket.connect("ws://" + this.shar.getUrlWithoutHttp() + "/lobby/lobby?name=" + player)
  }
  disconnect() {
    this.socket.disconnect();
  }
  // return this.http.get(this.url + "/lobby/lobby_status?name=" + player)
}
