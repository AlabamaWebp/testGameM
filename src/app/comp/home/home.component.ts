import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/cors/home.service';
import { SharedService } from 'src/app/services/data/shared.service';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cors: HomeService,
    private err: SharedService,
    private player: PlayerService,
    private router: Router,
    ) { }

  path = "http://127.0.0.1:78"
  nickname = ""

  ngOnInit(): void {
    this.initLocalS();
  }


  ngAfterViewInit() {
    this.fetchRooms();
    // this.intervalFetch();
  }


  //////// localstorage
  initLocalS() {
    if (localStorage.getItem("ip")) {
      this.path = localStorage.getItem("ip") as string;
    }
    else {
      this.err.setUrl(this.path);
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
        this.router.navigate(["/lob"]);
      }
      else if (d.status == "g") {
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
    this.err.setUrl(value);
    this.path = value;
    this.fetchRooms();
    // this.refresh();
  }

  getIpWithoutHttp() {
    if (this.path.includes("http://")) {
      return this.path.replace("http://", "")
    }
    return this.path
  }

  setNick(value: string) {
    this.err.setName(value)
    this.nickname = value;
  }


  /////data
  // interval_fetch: any = undefined;
  // intervalFetch() {
  //   this.interval_fetch = setInterval(() => {
  //     this.fetchRooms();
  //   }, 800)
  // }
  ngOnDestroy() {
    // clearInterval(this.interval_fetch);
  }

  // toggleRefresh() {
  //   if (this.interval_fetch == undefined) {
  //     this.intervalFetch();
  //   }
  //   else {
  //     clearInterval(this.interval_fetch);
  //     this.interval_fetch = undefined
  //   }
  // }

  data: any;
  rooms: string[] = [];
  fetchRooms() {
    this.cors.getHttp().get(this.path + "/rooms/rooms").subscribe((d: any) => {
      this.dataTable(d);
    });
  }
  // ?room=s&nickname=1
  roomIn(room: string) {
    this.cors.getHttp().post(this.path + `/rooms/in_room?room=${room}&nickname=${this.nickname}`, undefined).subscribe((d: any) => {
      this.player.setRoomIn(d.room, d.name);
      this.router.navigate(["/lob"]);
    });
  }
  // create_room?room=s&max_players=3
  createRoom(max: number) {
    this.cors.getHttp().post(this.path + `/rooms/create_room?room=server_${this.nickname}&max_players=${max}`, undefined).subscribe((d: any) => {
      this.roomIn(`server_${this.nickname}`);
      this.fetchRooms();
    });
  }
  delRoom(room: string) {
    this.cors.getHttp().delete(this.path + `/rooms/delete_room?room=${room}`).subscribe((d: any) => {
      this.dataTable(d);
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
