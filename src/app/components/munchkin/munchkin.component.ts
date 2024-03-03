import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-munchkin',
  standalone: true,
  imports: [],
  templateUrl: './munchkin.component.html',
  styleUrl: './munchkin.component.scss'
})
export class MunchkinComponent {
  constructor(private webs: WebsocketService, private router: Router) {
    !webs.isConnect() ? router.navigate(["start"]) : 0;
  }

  ngOnInit() {
    this.webs.on("refreshGame", (el: any) => { this.data = el; })
    this.webs.on("allLog", (el: any) => { this.plog = el; })
    this.webs.on("plusLog", (el: any) => { this.plog.push(el); })

    this.webs.emit("refreshGame");
    this.webs.emit("allLog");
  }
  data: refreshGame | undefined
  plog: string[] = []


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

interface playerData {
  name: string,
  lvl: number,
  sex: "Мужчина" | "Женщина",
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
  queue: number
}

interface GameField {
  fight?: {
      players: {
          main: playerData,
          secondary?: playerData
      }
      cards?: {
          players?: AbstractCard[],
          monsters?: AbstractCard[],
      }
      monsters: AbstractCard[]
      monstersProto: AbstractCard[]
      gold: number
  }
  openCards?: (AbstractCard)[]

}

interface AbstractCard {
  abstractData: AbstractData;
  id: number;
  strong?: number;
  data?: TreasureData | MonsterData;
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

interface AbstractData {
  name: string;
  description: string;
  cardType: "Класс" | "Раса" | "Проклятие" | "Монстр" | "Сокровище"
  img?: string;
}
interface MonsterData {
  lvl: number;
  strongest: number;
  gold: number;
  undead: boolean;
}
interface TreasureData {
  treasureType: "Надеваемая" | "Используемая" | "Боевая"
  template?: "Шлем" | "Броник" | "Ноги" | "Рука"
  | "2 Руки" | "3 Руки" | "Рядом" | undefined
  cost?: number | undefined
  big?: boolean | undefined
}