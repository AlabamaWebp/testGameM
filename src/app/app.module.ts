import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './comp/home/home.component';




import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LobbiComponent } from './comp/lobbi/lobbi.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbiComponent,
    PlayerCardComponent
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
