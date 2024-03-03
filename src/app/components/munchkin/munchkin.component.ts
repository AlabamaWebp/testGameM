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

  ngOnInit() {
    this.webs.on("refreshGame", (el: any) => {this.data = el;})
    this.webs.on("allLog", (el: any) => {this.plog = el;})
    this.webs.on("plusLog", (el: any) => {this.plog.push(el);})
    
    this.webs.emit("refreshGame");
    this.webs.emit("allLog");
  }
  data: any
  plog: string[] = []


}
