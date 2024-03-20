import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { AbstractCard, CardComponent } from './card/card.component';
import { PlayerComponent } from './player/player.component';

@Component({
  selector: 'app-munchkin',
  standalone: true,
  imports: [CardComponent, PlayerComponent],
  templateUrl: './munchkin.component.html',
  styleUrl: './munchkin.component.scss'
})
export class MunchkinComponent {
  constructor(private webs: WebsocketService, private router: Router) {
    !webs.isConnect() ? router.navigate(["start"]) : 0;
  }

  ngOnInit() {
    this.webs.on("refreshGame", (el: any) => { 
      this.data = el; console.log(el);
    })
    this.webs.on("allLog", (el: any) => { this.plog = el; })
    this.webs.on("plusLog", (el: any) => { this.plog.push(el); })

    this.webs.emit("refreshGame");
    this.webs.emit("allLog");
  }
  data!: refreshGame
  plog: string[] = []

  useCard(id: number) {
    this.webs.emit("useCard", id);
  }

}

interface refreshGame {
  queue: string,
  step:  0 | 1 | 2 | 3,
  // is_fight: this.is_fight,
  field: GameField,
  sbros:
  {
      doors: AbstractCard,
      treasures: AbstractCard
  },
  // log: this.log,
  players: playerData[],
  you: playerData
}

export interface playerData {
  name: string,
  lvl: number,
  sex: "Мужчина" | "Женщина",
  cards: AbstractCard[],
  t_field: {
    helmet: AbstractCard,
    body: AbstractCard,
    legs: AbstractCard,
    arm: AbstractCard,
    other: AbstractCard,
  }, 
  d_field: {
    rasses: AbstractCard,
    classes: AbstractCard,
  },
  queue: number,
  max_cards: number,
  power: number
}

interface GameField {
  is_fight: boolean
  fight?: {
      players: {
          main: playerData,
          secondary?: playerData,
          strongest: number ///
      }
      cards?: {
          players?: AbstractCard[],
          monsters?: AbstractCard[],
      }
      monsters: AbstractCard[]
      monsterStrongest: number ///
      // monstersProto: AbstractCard[]
      gold: number
      lvls: number ///

  }
  openCards?: (AbstractCard)[]

}
interface fieldTreasureCards {
  helmet?: AbstractCard[]
  body?: AbstractCard[]
  legs?: AbstractCard[]
  arm?: AbstractCard[]
  other?: AbstractCard[]
}
interface fieldDoorCards {
  rasses?: AbstractCard[]
  classes?: AbstractCard[]
}
