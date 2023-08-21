import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';




import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LobbiComponent } from './comp/lobbi/lobbi.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';
import { TestingPageComponent } from './comp/testing-page/testing-page.component';
import { CardCursesComponent } from './comp/cards/card-curses/card-curses.component';
import { CardMonsterComponent } from './comp/cards/card-monster/card-monster.component';
import { CardTreasureComponent } from './comp/cards/card-treasure/card-treasure.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbiComponent,
    PlayerCardComponent,
    TestingPageComponent,
    CardCursesComponent,
    CardMonsterComponent,
    CardTreasureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
