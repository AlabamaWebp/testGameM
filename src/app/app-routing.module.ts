import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';
import { LobbiComponent } from './comp/lobbi/lobbi.component';
import { TestingPageComponent } from './comp/testing-page/testing-page.component';
import { CardMonsterComponent } from './comp/cards/card-monster/card-monster.component';
import { CardCursesComponent } from './comp/cards/card-curses/card-curses.component';
import { CardTreasureComponent } from './comp/cards/card-treasure/card-treasure.component';

const routes: Routes = [
  // {path: "home", component}
  // {path: "**" , redirectTo: "home"},
  {path: "home" , component: HomeComponent},
  {path: "pl" , component: PlayerCardComponent},
  {path: "lob" , component: LobbiComponent},
  {path: "test" , component: TestingPageComponent},
  {path: "cur" , component: CardCursesComponent},
  {path: "mon" , component: CardMonsterComponent},
  {path: "tre" , component: CardTreasureComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
