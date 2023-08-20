import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/services/cors/home.service';
import { ErrorService } from 'src/app/services/data/error.service';
import { PlayerService } from 'src/app/services/player/player.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private cors: HomeService,
    private err: ErrorService,
    private player: PlayerService,
    private router: Router,
    ) { }

  path = "192.168.0.1:8081"
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
    if (localStorage.getItem("name")) {
      this.nickname = localStorage.getItem("name") as string;
      this.checkGame();
    }
  }

  checkGame() {
    this.cors.getHttp().get("http://"+this.path + "/game/lobby_status?name=" + this.nickname).subscribe((d: any) => {
      if (d.status == "r") {
        this.player.setRoomIn(d);
        this.router.navigate(["/lob"]);
      }
      else if (d.status == "g") {
        // Дописать надо когда будет игра
      }
    });
  }

  ////// setters
  setIp(value: string) {
    this.err.setUrl(value);
    this.path = value;
    this.fetchRooms();
    // this.refresh();
  }
  setNick(value: string) {
    localStorage.setItem("name", value);
    this.nickname = value;
  }


  /////data
  interval_fetch: any = undefined;
  intervalFetch() {
    this.interval_fetch = setInterval(() => {
      this.fetchRooms()
    }, 800)
  }
  ngOnDestroy() {
    clearInterval(this.interval_fetch);
  }

  toggleRefresh() {
    if (this.interval_fetch == undefined) {
      this.intervalFetch();
    }
    else {
      clearInterval(this.interval_fetch);
      this.interval_fetch = undefined
    }
  }

  data: any;
  rooms: string[] = [];
  fetchRooms() {
    this.cors.getHttp().get("http://"+this.path + "/rooms/rooms").subscribe((d: any) => {
      this.dataTable(d);
    });
  }
  // ?room=s&nickname=1
  roomIn(room: string) {
    this.cors.getHttp().post("http://"+this.path + `/rooms/in_room?room=${room}&nickname=${this.nickname}`, undefined).subscribe((d: any) => {
      this.player.setRoomIn(d);
      this.router.navigate(["/lob"]);
    });
  }
  roomOut(room: string) {
    this.cors.getHttp().post("http://"+this.path + `/rooms/out_room?room=${room}&nickname=${this.nickname}`, undefined).subscribe((d: any) => {
      this.dataTable(d);
    });
  }
  // create_room?room=s&max_players=3
  createRoom(max: number) {
    this.cors.getHttp().post("http://"+this.path + `/rooms/create_room?room=server_${this.nickname}&max_players=${max}`, undefined).subscribe((d: any) => {
      this.roomIn(`server_${this.nickname}`);
      console.log(d);
      this.fetchRooms();
    });
  }
  delRoom(room: string) {
    this.cors.getHttp().delete("http://"+this.path + `/rooms/delete_room?room=${room}`).subscribe((d: any) => {
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
