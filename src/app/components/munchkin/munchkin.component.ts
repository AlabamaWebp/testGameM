import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-munchkin',
  standalone: true,
  imports: [],
  templateUrl: './munchkin.component.html',
  styleUrl: './munchkin.component.scss'
})
export class MunchkinComponent {
  constructor(private webs: WebsocketService, private router: Router) {
    !webs.isConnect() ? router.navigate(["start"]) : 0;
  }

}
