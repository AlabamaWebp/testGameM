import { Component } from '@angular/core';
import { ErrorService } from './services/data/error.service';
import { Subscription } from 'rxjs';
import { SharedService } from './services/data/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private subs: Subscription = new Subscription;

  constructor(private readonly er: ErrorService, private shared: SharedService){}

  ngOnInit() {
    this.subs = this.er.errorsIn$.subscribe((d: string) => {
      this.addError(d);
    });
    this.initLocalS();
  }

  errors: string[] = [];

  removeError(er: string) {
    document.getElementsByClassName(er)[0].classList.add("removing");
    setTimeout(() => {
      this.errors.splice(this.errors.indexOf(er),1);
    }, 1000);
  }
  addError(d: string) {
    this.errors.push(d);
    setTimeout(() => {
      this.removeError(d);
    }, 4000);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  initLocalS() {
    if (localStorage.getItem("ip")) {
      this.shared.setUrl(localStorage.getItem("ip") as string);
    }
    if (localStorage.getItem("name")) {
      this.shared.setName(localStorage.getItem("name") as string);
    }
  }

  // createError() {
  //   let el = document.createElement('div');
  //   el.classList.add("error");
  //   const cont = document.getElementById("error_cont") as HTMLElement;
  //   cont.appendChild(el);
  // }
}
