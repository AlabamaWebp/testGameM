import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  // constructor(router: Router) {router.navigate(["start"])} // Для теста
  constructor(
    // router: Router,
    // private webs: WebsocketService
  ) {

    // router.navigate(["start"])
  }

}
