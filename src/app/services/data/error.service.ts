import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  private count = 0;
  getCount() {
    return this.count++;
  }

  public errorsIn$ = new Subject<any>();
}
