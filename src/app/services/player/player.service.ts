import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { IPlyayer } from 'src/app/models/player';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  url = ''

  private room_in: any;
  private room_name: string = ""


  // get_card() {
  //   return this.http.get<ICard>(this.url)
  // }

  setRoomIn(value: any, name: string) {
    this.room_in = value
    this.room_name = name
  }

  getRoomIn() {
    return [this.room_in, this.room_name]
  }

}
