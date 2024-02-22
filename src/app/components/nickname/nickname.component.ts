import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nickname',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './nickname.component.html',
  styleUrl: './nickname.component.scss'
})
export class NicknameComponent {
  control = new FormControl('', [Validators.required,]);
  constructor(private webs: WebsocketService, private router: Router) { }
  ngOnInit() {
    const n = localStorage.getItem("nickname");
    if (n) {
      this.control.setValue(n);
    }
  }

  subscribed: boolean = false;
  answer: string | boolean | undefined;
  test = true
  click() {
    if (!this.subscribed) {
      this.webs.on("statusName", (d: any) => { this.changeAnswer(d) });
      this.subscribed = true;
    }
    this.webs.emit("setName", this.control.value);
  }
  changeAnswer(d: any) {
    if (d === "home"){
      localStorage.setItem("nickname", this.control.value as string)
      this.router.navigate(["home"])
    }
    else if (typeof d === "string") {
      this.answer = d;
      console.log(this.answer);
      this.control.setErrors({"incorrect": true})
    }
  }
}
