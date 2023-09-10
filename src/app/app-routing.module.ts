import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';
import { LobbyComponent } from './comp/lobbi/lobby.component';
import { TestingPageComponent } from './comp/testing-page/testing-page.component';
import { GameRoomComponent } from './comp/game-room/game-room.component';

const routes: Routes = [
  // {path: "home", component}
  {path: "home" , component: HomeComponent},
  // {path: "pl" , component: PlayerCardComponent},
  {path: "lob" , component: LobbyComponent},
  // {path: "test" , component: TestingPageComponent},
  {path: "game" , component: GameRoomComponent},
  {path: "**" , redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
