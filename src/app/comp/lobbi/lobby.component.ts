import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlyayer } from 'src/app/models/player';
import { SharedService } from 'src/app/services/data/shared.service';
import { LobbyService } from 'src/app/services/cors/lobby.service';
import { RoomService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-lobbi',
  templateUrl: './lobbi.component.html',
  styleUrls: ['./lobbi.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(
    private lobbyService: LobbyService,
    private playerService: RoomService,
    private shared: SharedService,
    private router: Router
  ) { }

  gender: boolean = true;
  pl_ready: boolean = false;
  player: IPlyayer[] = [];
  lobby_data: RoomIn = this.playerService.getRoomIn().data;
  lobby_name = this.playerService.getRoomIn().name;
  nickname = this.shared.getName();

  getPlayers() {
    if (!this.lobby_data)
      return []
    let tmp = this.lobby_data.players;
    while (tmp.length != this.lobby_data.count_players) {
      tmp.push("Пусто");
    }
    return tmp
  }

  setLobbyData() {
    let tmp: RoomIn = this.playerService.getRoomIn().data
    if (tmp.woman_players == undefined) {
      tmp.woman_players = []
    }
    this.lobby_data = tmp;
    this.lobby_name = this.playerService.getRoomIn().name;

  }

  ngOnInit(): void {
    this.checkStatus();
  }
  ngOnDestroy() {
    this.lobbyService.disconnect()
  }
  checkStatus() {
    this.lobbyService.connect(this.nickname).subscribe((d: any) => {
      this.statusHelper(d);
      console.log(d);
    });
  }
  statusHelper(d: any) {
    console.log(d);
    if (d.status != "r") {
      this.lobbyService.disconnect();
    }
    else if (d.step && d.step == 1) {
      this.router.navigate(["/game"]);
    }
    if (d.status == "r") {
      this.playerService.setRoomIn(d.room, d.name);
      this.setLobbyData();
      this.pl_ready = this.lobby_data.ready_players.includes(this.nickname);
    }
    else if (d.status == "n") {
      this.router.navigate(["/home"]);
    }
    else if (d.status == "g") {
      // Дописать надо когда будет игра
      this.router.navigate(["/game"]);
    }
  }

  genderChange(bool: boolean) {
    this.gender = bool;
    this.lobbyService.setSex(this.nickname, this.lobby_name, !bool).subscribe(() => {
      // this.checkStatus()
    })
  }


  playerReady() {
    this.lobbyService.setReady(this.nickname, this.lobby_name, !this.pl_ready).subscribe((d) => {
      // this.statusHelper(d)
      // this.checkStatus()
    })
  }

  exitRoom() {
    this.lobbyService.roomOut(this.lobby_name, this.nickname).subscribe((d) => {
      this.router.navigate(["/home"])
    })
  }
}


export class RoomIn {
  "players": string[] = []
  "count_players": number = 2
  "ready_players": string[] = []
  "woman_players": string[] = []
}