import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SharedService } from '../data/shared.service';
import { WebsocketService } from 'src/app/websocket';
import { WS } from 'src/app/websocket.events';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  constructor(
    private socket: WebsocketService,
    //  private shared: SharedService
     ) {}

  // socket: WebsocketService;

  private messages$: Observable<any> = new Observable;

  getMessage() {
    return this.socket
  }
  connect(url: string) {
    this.socket.ngOnDestroy()
    this.socket = new WebsocketService({url: url});
    this.messages$ = this.socket.on<any>(WS.ON.MESSAGES);
    return this.messages$
  }
  // getMessage() {
  //   return this.messages$ 
  // }
  disconnect() {
    this.socket.ngOnDestroy()
  }
}
