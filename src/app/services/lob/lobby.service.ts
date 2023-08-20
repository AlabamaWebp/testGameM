import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorService } from '../data/error.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient, private errors: ErrorService) { }

  // get_count_player_in_lobby(){
  //   return this.http.get<any>(this.url);
  // }

  url = this.errors.getUrl();

  get_ready_players() {
    return this.http.get<any>(this.url);
  }

}
