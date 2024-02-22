import { Routes } from '@angular/router';
import { NicknameComponent } from './components/nickname/nickname.component';

export const routes: Routes = [
    {path: "start" , component: NicknameComponent},
    {path: "**", redirectTo: "start"}

];
