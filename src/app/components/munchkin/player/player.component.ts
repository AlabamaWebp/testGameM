import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { playerData } from '../munchkin.component';
import { CardComponent } from '../card/card.component';
 import { WebsocketService } from '../../../services/websocket.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnChanges {
  @Input() data!: playerData
  @Input() podrobnee = false;
  @Input() dataMesto: number | undefined;
  @Output() template = new EventEmitter();

  constructor(private webs: WebsocketService,) { }

  closeBackdrop(ev: MouseEvent) {
    const el = ev.target as HTMLElement;
    if (el.className.includes('backdrop')) {
      this.podrobnee = false
    }
  }

  clickTemplate(s: string) {
    this.template.emit(s);
  }
  useCardMesto(mesto: string) {
    const body = {
      id_card: this.dataMesto,
      mesto: mesto,
    }
    this.webs.emit("useCardMesto", body);
    console.log(mesto);
    this.podrobnee = false;
    this.dataMesto = undefined;
  }
  ngOnChanges(d: SimpleChanges) {
    if (d['dataMesto']?.currentValue) {
      this.podrobnee = true;
      console.log(d['dataMesto']);
    }
  }
}
export interface cardMestoEvent {
  mesto: "first" | "second" | "bonus"
}