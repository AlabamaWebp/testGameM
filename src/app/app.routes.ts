import { Routes } from '@angular/router';
import { NicknameComponent } from './components/nickname/nickname.component';
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent } from './components/lobby/lobby.component';

export const routes: Routes = [
    {path: "start", loadComponent: () => NicknameComponent},
    {path: "home", loadComponent: () => HomeComponent},
    {path: "lobby", loadComponent: () => LobbyComponent},
    {path: "**", redirectTo: "start"}

];
