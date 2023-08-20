import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './comp/home/home.component';
import { PlayerCardComponent } from './comp/player-card/player-card.component';
import { LobbiComponent } from './comp/lobbi/lobbi.component';
import { TestingPageComponent } from './comp/testing-page/testing-page.component';

const routes: Routes = [
  // {path: "home", component}
  {path: "home" , component: HomeComponent},
  // {path: "pl" , component: PlayerCardComponent},
  {path: "lob" , component: LobbiComponent},
  // {path: "test" , component: TestingPageComponent},
  {path: "**" , redirectTo: "home"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
