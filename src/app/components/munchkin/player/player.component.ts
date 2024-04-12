import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { playerData } from '../munchkin.component';
import { CardComponent, toPlayer } from '../card/card.component';
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
  @Input() dataMesto: toPlayer | undefined;
  @Output() template = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor(private webs: WebsocketService,) { }

  closeBackdrop(ev: MouseEvent) {
    const el = ev.target as HTMLElement;
    if (el.className.includes('backdrop')) {
      this.closePodrobnee();
    }
  }

  closePodrobnee() {
    this.podrobnee = false;
    this.close.emit();
  }

  clickTemplate(s: string) {
    this.template.emit(s);
  }
  useCardMesto(mesto: string) {
    if (!this.dataMesto) return;
    const body = {
      id_card: this.dataMesto?.id,
      mesto: mesto,
    }
    this.webs.emit("useCardMesto", body);
    this.closePodrobnee();
  }
  ngOnChanges(d: SimpleChanges) {
    console.log(d);
    if (d['dataMesto']?.currentValue) {
      this.podrobnee = true;
    }
  }
}
export interface cardMestoEvent {
  mesto: "first" | "second" | "bonus"
}