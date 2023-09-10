import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICard } from 'src/app/models/card';
import { IPlyayer } from 'src/app/models/player';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  // url = ''

  private room_in: any;
  private room_name: string = ""


  // get_card() {
  //   return this.http.get<ICard>(this.url)
  // }

  setRoomIn(value: any, name: string) {
    this.room_in = value
    this.room_name = name
  }

  getRoomIn(): RoomIn2 {
    // return [this.room_in, this.room_name]
    if (this.room_name.length == 0) {
      this.room_name = "test"
    }
    let room = new RoomIn2()
    room.data = this.room_in
    room.name = this.room_name
    return room;
  }

}
export class RoomIn2 {
  data: any = "test"
  name: string = "test"
}