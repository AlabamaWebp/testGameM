import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';
import { SharedService } from '../data/shared.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketServiceService {

  constructor(private socket: Socket, private shared: SharedService) {}

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  connect(url: string) {
    this.socket.disconnect();
    this.socket = new Socket({url: "ws://" + this.shared.getUrlWithoutHttp(), options: {path: url}})
  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data: any) => {
      console.log(data);
      data.data
    }));
  }
  disconnect() {
    this.socket.disconnect()
  }
}
