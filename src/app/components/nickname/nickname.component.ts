import { AfterViewInit, Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-nickname',
  standalone: true,
  imports:  [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './nickname.component.html',
  styleUrl: './nickname.component.scss'
})
export class NicknameComponent{
  nickname: string = ""
  constructor(private webs: WebsocketService) {}

  subscribed: boolean = false;
  click() {
    if (!this.subscribed) {
      this.webs.on("statusName", (d: any) => {alert(d)});
      this.subscribed = true;
    }
    this.webs.emit("setName", this.nickname);
  }
}
