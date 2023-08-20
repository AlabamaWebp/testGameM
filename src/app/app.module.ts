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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LobbiComponent,
    PlayerCardComponent,
    TestingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
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
