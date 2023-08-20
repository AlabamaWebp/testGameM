import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private http: HttpClient) { }

  url = ''

  get_count_player_in_lobby(count: number){
    return this.http.get<any>(this.url);
  }
}
