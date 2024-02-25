import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss'
})
export class LobbyComponent {
  constructor(private webs: WebsocketService, private router: Router) {
    !webs.isConnect() ? router.navigate(["start"]) : 0;
  }
  ngOnInit() {
    this.webs.on("statusLobby", (e: any) => {
      this.data = e; console.log("s", e);
    })
    this.webs.emit("statusLobby", undefined)
  }
  data: data | undefined;
  clickReady(d: boolean) {
    this.webs.emit("setReady", d)
  }
  clickSex(d: string) {
    this.webs.emit("setSex", d)
  }
}
interface data {
  name: string,
  creator: boolean,
  players: player[],
  maxPlayers: number,
}
interface player {
  nickname: string,
  sex: "Мужчина" | "Женщина",
  ready: boolean,
  you: boolean
}