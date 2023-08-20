import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/cors/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public cors: HomeService) { }

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
    }
  }

  ////// setters
  setIp(value: string) {
    localStorage.setItem("ip", value);
    this.path = value;
    // this.refresh();
  }
  setNick(value: string) {
    localStorage.setItem("name", value);
    this.nickname = value;
  }


  // refresh() {
  //   this.fetchRooms();
  // }


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
    this.cors.getHttp().get("http://"+this.path + "/rooms").subscribe((d: any) => {
      this.dataTable(d);
    });
  }
  // ?room=s&nickname=1
  roomIn(room: string) {
    this.cors.getHttp().post("http://"+this.path + `/in_room?room=${room}&nickname=${this.nickname}`, undefined).subscribe((d: any) => {
      console.log(d);
      
      // this.roomOut(room);
        
    });
  }
  roomOut(room: string) {
    this.cors.getHttp().post("http://"+this.path + `/out_room?room=${room}&nickname=${this.nickname}`, undefined).subscribe((d: any) => {
      this.dataTable(d);
    });
  }
  // create_room?room=s&max_players=3
  createRoom(max: number) {
    this.cors.getHttp().post("http://"+this.path + `/create_room?room=server_${this.nickname}&max_players=${max}`, undefined).subscribe((d: any) => {
      // this.dataTable(d);
      this.roomIn(`server_${this.nickname}`);
      console.log(d);
    });
  }
  delRoom(room: string) {
    this.cors.getHttp().delete("http://"+this.path + `/delete_room?room=${room}`).subscribe((d: any) => {
      this.dataTable(d);
    });
  }
  dataTable(d: any) {
    this.data = d;
    this.rooms = Object.keys(d);
  }

  test(a:any) {
    console.log(a);
    // return true;
  }
}
