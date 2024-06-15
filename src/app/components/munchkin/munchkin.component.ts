import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { AbstractCard, CardComponent, toPlayer } from './card/card.component';
import { PlayerComponent } from './player/player.component';
// import { MatIconModule } from '@angular/material/icon';

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
      this.data = undefined;
      setTimeout(() => {
        this.data = el;
      }, 1);
      console.log(el);
    })

    this.webs.on("condition", (el: any) => {
      clearTimeout(this.cond_timer);
      this.condition = el;
      this.cond_timer = setTimeout(() => {
        this.condition = undefined
      }, 5000);
    })

    this.webs.on("allLog", (el: any) => { this.plog = el; })
    this.webs.on("plusLog", (el: any) => { this.plog.push(el); })

    this.webs.emit("refreshGame");
    this.webs.emit("allLog");
    // firstStepHod
  }
  getDoorCard() {
    this.webs.emit("getDoorCardByPlayer")
  }
  cond_timer: any;
  condition: string | undefined;
  data: refreshGame | undefined;
  plog: string[] = [];

  is_mesto_card = false;

  useCard(id: number) {
    this.webs.emit("useCard", id);
  }
  useCardMesto(body: toPlayer) {
    this.dataMesto = body;
  }
  dataMesto: toPlayer | undefined;
  closeYou() {
    this.dataMesto = undefined;
  }
}

interface refreshGame {
  queue: string,
  step: 0 | 1 | 2 | 3,
  // is_fight: this.is_fight,
  field: GameField,
  sbros:
  {
    doors: AbstractCard,
    treasures: AbstractCard
  },
  // log: this.log,
  players: playerData[],
  you: playerData,
  you_hodish: boolean
}

export interface playerData {
  name: string,
  lvl: number,
  sex: "Мужчина" | "Женщина",
  cards: AbstractCard[],
  t_field: {
    helmet: AbstractCard[],
    body: AbstractCard[],
    legs: AbstractCard[],
    arm: [],
    other: AbstractCard[],
  },
  d_field: {
    rasses: {
      first: AbstractCard,
      second: AbstractCard,
      bonus: AbstractCard,
    }
    classes: {
      first: AbstractCard,
      second: AbstractCard,
      bonus: AbstractCard,
    }
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
