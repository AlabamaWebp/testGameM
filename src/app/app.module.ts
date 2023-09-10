import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';




import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/http-interceptor/interceptor.service';
import { LobbyComponent } from './comp/lobbi/lobby.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';
import { TestingPageComponent } from './comp/testing-page/testing-page.component';
import { GameRoomComponent } from './comp/game-room/game-room.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { WebsocketModule } from './websocket';
import { WebsocketModuleNash } from './services/websocket/web-socket-service.module';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbyComponent,
    PlayerCardComponent,
    TestingPageComponent,
    GameRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WebsocketModuleNash,
    WebsocketModule.config({
      url: 'http:localhost:8080'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
