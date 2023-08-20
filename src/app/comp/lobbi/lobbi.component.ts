import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlyayer } from 'src/app/models/player';
import { RoomIn } from 'src/app/models/shared';
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
  pl_reay: boolean = true
  player: IPlyayer[] = [];
  lobby_data: RoomIn = this.playerService.getRoomIn()[0];
  lobby_name = this.playerService.getRoomIn()[1];
  nickname = this.shared.getName()

  ngOnInit(): void {
    // this.lobbyService.get_count_player_in_lobby().subscribe(data => {
    //   this.player = data;
    // });
    this.lobbyService.checkStatus(this.nickname).subscribe((d: any) => {
      if (d.status == "n") {
        this.router.navigate(["/home"]);
      }
      else if (d.status == "g") {
        // Дописать надо когда будет игра
      }
    });
  }

  genderChange(bool: boolean){
    this.gender = bool;
    this.lobbyService.setSex(this.nickname, bool).subscribe() 
  }


  playerReady() {
    this.pl_reay = !this.pl_reay; 
  }

  exitRoom(){
    // выйти из лобби
    console.log(this.nickname);
    
    this.lobbyService.roomOut(this.lobby_name, this.nickname).subscribe((d) => {
      this.router.navigate(["/home"])
    })
  }

  
}
