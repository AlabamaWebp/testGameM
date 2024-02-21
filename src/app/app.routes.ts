import { Routes } from '@angular/router';
import { NicknameComponent } from './components/nickname/nickname.component';

export const routes: Routes = [
    {path: "nickname" , component: NicknameComponent},
    {path: "**", redirectTo: "nickname"}

];
