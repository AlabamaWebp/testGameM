import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  constructor(private webs: WebsocketService, private router: Router) {
    !webs.isConnect() ? router.navigate(["start"]) : 0;
  }
  ngOnInit() {
    this.webs.on("statusLobby", (e: any) => {this.data = e})
    this.webs.emit("statusLobby", undefined)
  }

  data: data | undefined
}
interface data {
  name: string,
  creator: boolean,
  players: player[]
  maxPlayers: number,
}
interface player {
  nickname: string,
  sex: boolean,
  ready: boolean,
  you: boolean
}