import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, map } from 'rxjs';
import { SharedService } from '../data/shared.service';
import { WebsocketService } from 'src/app/websocket';
import { WS } from 'src/app/websocket.events';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  constructor(private socket: WebsocketService, private shared: SharedService) {
  }

  private messages$: Observable<any> = new Observable;

  sendMessage(msg: string) {
    // this.socket.emit('message', msg);
  }
  connect(url: string) {
    this.socket.ngOnDestroy()
    this.socket = new WebsocketService({url: url});
    this.messages$ = this.socket.on<any>(WS.ON.MESSAGES)

    // return this.socket.on<any>(WS.ON.MESSAGES)

    // this.socket.disconnect();
    // this.socket = new Socket({url: "ws://" + this.shared.getUrlWithoutHttp(), options: {path: url}})
  }
  getMessage() {
    return this.messages$ 
  }
  disconnect() {
    this.socket.ngOnDestroy()
  }
}
