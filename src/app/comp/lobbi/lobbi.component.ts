import { Component, OnInit } from '@angular/core';
import { IPlyayer } from 'src/app/models/player';
import { LobbyService } from 'src/app/services/lob/lobby.service';

@Component({
  selector: 'app-lobbi',
  templateUrl: './lobbi.component.html',
  styleUrls: ['./lobbi.component.scss']
})
export class LobbiComponent implements OnInit{

  constructor(private lobbyService: LobbyService){}

  gender: boolean = true;
  pl_reay: boolean = true
  player: IPlyayer[] = [];

  ngOnInit(): void {
    // this.lobbyService.get_count_player_in_lobby().subscribe(data => {
    //   this.player = data;
    // });
  }

  genderChange(){
    this.gender = !this.gender;
    console.log(this.gender);
    if(this.gender === false){
      // womanLogo лого девушуи  
    }
    else{
      // лого мужика
    }
    
  }


  playerReady() {
    this.pl_reay = !this.pl_reay; 
  }

  exitRoom(){
    // выйти из лобби
    console.log('ti vishel');
  }

  
}
