import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  your_cards = [
    "kard",
    "kard",
    "kard",
    "kard",
    "kard",
    "kard",
    "kard",
    "kard",
  ]
  actions = [
    "kard",
    "kard",
    "kard",
  ]
  players = [
    "kard",
    "kard",
  ]

}
