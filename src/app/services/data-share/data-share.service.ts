import { Injectable } from '@angular/core';
import { refreshGame } from '../../components/munchkin/munchkin.component';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  private _munchkin?: refreshGame;
  public set munchkin(value: refreshGame | undefined) {
    this._munchkin = value;
  }
  public get munchkin(): refreshGame | undefined {
    return this._munchkin;    
  }

}
