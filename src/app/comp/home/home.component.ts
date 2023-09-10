import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/cors/home.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { SharedService } from 'src/app/services/data/shared.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { WebSocketServiceService } from 'src/app/services/websocket/web-socket-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cors: HomeService,
    private shar: SharedService,
    private player: PlayerService,
    private router: Router,
    private socket: WebSocketServiceService,
    public er: ErrorService
    ) { }

  path = "http://127.0.0.1:78"
  nickname = ""
  isConnected = false;

  ngOnInit(): void {
    this.initLocalS();
  }


  ngAfterViewInit() {
    this.fetchRooms();
  }


  //////// localstorage
  initLocalS() {
    if (localStorage.getItem("ip")) {
      this.path = localStorage.getItem("ip") as string;
    }
    else {
      this.shar.setUrl(this.path);
    }
    if (localStorage.getItem("name")) {
      this.nickname = localStorage.getItem("name") as string;
      this.checkGame();
    }
  }

  checkGame() {
    this.cors.getHttp().get(this.path + "/game/lobby_status?name=" + this.nickname).subscribe((d: any) => {
      if (d.status == "r") {
        this.player.setRoomIn(d.room, d.name);
        this.socket.disconnect()
        this.router.navigate(["/lob"]);
      }
      else if (d.status == "g") {
        this.socket.disconnect()
        this.router.navigate(["/game"]);
        // Дописать надо когда будет игра
      }
    });
  }

  ////// setters
  setIp(value: string) {
    if (!value.includes("http://")) {
      value = "http://" + value;
    }
    this.shar.setUrl(value);
    this.path = value;
    this.fetchRooms();
  }

  getIpWithoutHttp() {
    if (this.path.includes("http://")) {
      return this.path.replace("http://", "")
    }
    return this.path
  }

  setNick(value: string) {
    this.shar.setName(value)
    this.nickname = value;
  }


  ngOnDestroy() {
    this.socket.disconnect();
  }


  data: any;
  rooms: string[] = [];
  fetchRooms() {
    this.socket.disconnect();
    this.socket.connect("ws://" + this.shar.getUrlWithoutHttp() + "/rooms/rooms").subscribe((d: any) => {
      if (typeof d == "string") {
        // this.roomIn(`server_${this.nickname}`)
        this.roomIn(d);
      }
      // this.isConnected = true;
      this.dataTable(d);
      // if (d.event == "create") {
      //   this.roomIn(`server_${this.nickname}`);
      // }
    }, (err) => {
      if (err.status == 500) {
        this.er.errorsIn$.next(this.er.getCount() + ".  " + err.error.detail)
      }
    });
    this.socket.getStatus().subscribe((d2: boolean) => {
      this.isConnected = d2;
    });
  }
  // ?room=s&nickname=1
  roomIn(room: string) {
    try {
      this.socket.getMessage().send("roomIn", {
        name: this.nickname,
        room: room
      })
      this.player.setRoomIn(room, this.nickname);
      this.socket.disconnect();
      this.router.navigate(["/lob"]);
    }
    catch {console.error("roomIn");
    }
  }
  // create_room?room=s&max_players=3
  createRoom(max: number) {
    try {
      this.socket.getMessage().send("create", //JSON.stringfy
      {
        name: this.nickname,
        max: max
      });
    }
    catch {
      console.error("create");
    }
  }
  delRoom(room: string) {
    this.socket.getMessage().send("delete", //JSON.stringfy
    {
      room: room
    });
  }
  dataTable(d: any) {
    this.data = d;
    this.rooms = Object.keys(d);
  }

  test(a:any) {
    console.log(a);
  }
}
