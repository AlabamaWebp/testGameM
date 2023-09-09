import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';




import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/http-interceptor/interceptor.service';
import { LobbiComponent } from './comp/lobbi/lobbi.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';
import { TestingPageComponent } from './comp/testing-page/testing-page.component';
import { GameRoomComponent } from './comp/game-room/game-room.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbiComponent,
    PlayerCardComponent,
    TestingPageComponent,
    GameRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),
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
