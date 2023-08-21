import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlyayer } from 'src/app/models/player';
import { SharedService } from 'src/app/services/data/shared.service';
import { LobbyService } from 'src/app/services/lob/lobby.service';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-lobbi',
  templateUrl: './lobbi.component.html',
  styleUrls: ['./lobbi.component.scss']
})
export class LobbiComponent implements OnInit{

  constructor(
    private lobbyService: LobbyService,
    private playerService: PlayerService,
    private shared: SharedService,
    private router: Router
    ){}

  gender: boolean = true;
  pl_ready: boolean = false;
  player: IPlyayer[] = [];
  lobby_data: RoomIn = this.playerService.getRoomIn()[0];
  lobby_name = this.playerService.getRoomIn()[1];
  nickname = this.shared.getName();
  interval: any;

  setInter() {
    this.interval = setInterval(() => {
      this.checkStatus();
    }, 500)
  }
  clearInter() {
    this.interval ? clearInterval(this.interval) : 0;
  }

  getPlayers() {
    let tmp = this.lobby_data.players;
    while (tmp.length != this.lobby_data.count_players) {
      tmp.push("Пусто");
    }
    return tmp
  }

  setLobbyData() {
    this.lobby_data = this.playerService.getRoomIn()[0];
    this.lobby_name = this.playerService.getRoomIn()[1];
  }

  ngOnInit(): void {
    // this.lobbyService.get_count_player_in_lobby().subscribe(data => {
    //   this.player = data;
    // });
    this.checkStatus();
    this.setInter();
  }
  ngOnDestroy() {
    this.clearInter();
  }
  checkStatus() {
    this.lobbyService.checkStatus(this.nickname).subscribe((d: any) => {
      this.statusHelper(d);
    });
  }
  statusHelper(d: any) {
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

  genderChange(bool: boolean){
    this.gender = bool;
    this.lobbyService.setSex(this.nickname, this.lobby_name, !bool).subscribe(() => {this.checkStatus()}) 
  }


  playerReady() {
    this.lobbyService.setReady(this.nickname,this.lobby_name, !this.pl_ready).subscribe((d) => {
      this.checkStatus()
    })
  }

  exitRoom(){
    this.lobbyService.roomOut(this.lobby_name, this.nickname).subscribe((d) => {
      this.router.navigate(["/home"])
    })
  }
}


export interface RoomIn {
  "players": string[],
  "count_players": number,
  "ready_players": string[],
  "woman_players": string[],
}