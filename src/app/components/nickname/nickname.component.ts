import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-nickname',
  standalone: true,
  imports:[MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './nickname.component.html',
  styleUrl: './nickname.component.scss'
})
export class NicknameComponent {
  nickname: string = ""
  constructor(public webs: WebsocketService) {}
}
