import { Component, OnInit } from '@angular/core';
import { GameRoomService } from 'src/app/services/cors/game-room.service';
import { SharedService } from 'src/app/services/data/shared.service';
import { webSocket } from 'rxjs/webSocket';
import { PlayerService } from 'src/app/services/player/player.service';
import { Observable } from 'rxjs';
import { WebSocketServiceService } from 'src/app/services/websocket/web-socket-service.service';


@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  constructor(private query: GameRoomService, private shared: SharedService, private player: PlayerService, private wsss: WebSocketServiceService) { }


  ngOnInit(): void {
    this.fetchStatus();
  }

  your_cards: any;
  current_player: Player | undefined;
  actions = [
    "kard",
    "kard",
    "kard",
  ]
  players: Player[] | undefined;

  ngOnDestroy() {
    this.query.closeConnection();
  }

  fetch_data: GameRoom | undefined
  fetchStatus() {
    // this.query.connect("ws://" + this.shared.getUrlWithoutHttp() + "/game/game?game_room=" + this.player.getRoomIn().name)
    //   .onmessage = (d: any) => {
    //     d = JSON.parse(d.data);
    //     this.processingData(d);
    //     // this.query.closeConnection()
    // }
    this.wsss.connect("/game/game?game_room=" + this.player.getRoomIn().name)
    this.wsss.getMessage().subscribe((d: any) => {
      console.log(d);
      
    })

  }
  processingData(d: any) {
    this.fetch_data = d;
    if (this.fetch_data != undefined) {

      for (let i = 0; i < this.fetch_data.players.length; i++) {
        if (this.fetch_data.players[i].nickname == this.shared.getName()) {
          this.current_player = this.fetch_data.players[i];
          this.your_cards = this.fetch_data.players[i].cards;
          break;
        }
      }
      this.players = this.fetch_data.players
    }
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
  sex: boolean = true
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
// name	"Меч5"
// strong	"5"
// template	"hand"
// test	"900"
// type	"treasure"

// name	"Удар"
// action	"ll"
// strongest	"1"
// type	"curses"

// name	"Чувырла5"
// lvl	"20"
// punishment	"1"
// gold	"5"
// undead	"0"