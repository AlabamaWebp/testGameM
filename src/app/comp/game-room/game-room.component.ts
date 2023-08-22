import { Component, OnInit } from '@angular/core';
import { GameRoomService } from 'src/app/services/cors/game-room.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {

  constructor(private query: GameRoomService) { }

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

  /////data
  interval_fetch: any = undefined;
  intervalFetch() {
    this.interval_fetch = setInterval(() => {
      this.fetchStatus();
    }, 800)
  }
  ngOnDestroy() {
    clearInterval(this.interval_fetch);
  }

  fetchStatus() {
    this.query.getData().subscribe
  }

}


export class GameRoom {
  players: Player[] = []
  count_players: number = 2
  doors: any = []
  treasures: any = []
  sbros_doors: any = []
  sbros_treasures: any = []
  queue: number = 0
  step: number = 1
}

export class Player {
  nickname: string = "test"
  lvl: number = 1
  strongest: number = this.lvl
  one_fight_strong: number = 0
  cards: any = []
  field_cards: any = []
}

export class AbstractCard {
  name: string = "test"
}


export class TreasureCard extends AbstractCard {
  strong: number = 0
  cost: number = 0
  template: string = "test"
}


export class MonsterCard extends AbstractCard {
  lvl: number = 1
  strongest: number = this.lvl
  gold: number = 1
  undead: boolean = false
  punishment: number = 1
}


export class CourseCard extends AbstractCard {
  action: string = "test"
  strongest: number = 0
}    
