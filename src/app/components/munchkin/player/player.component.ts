import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, inject } from '@angular/core';
import { playerData } from '../munchkin.component';
import { CardComponent, toPlayer } from '../card/card.component';
import { WebsocketService } from '../../../services/websocket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AskHelpGoldComponent } from '../dialogs/ask-help-gold/ask-help-gold.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CardComponent, MatButtonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnChanges {
  @Input() data!: playerData
  @Input() podrobnee = false;
  @Input() dataMesto: toPlayer | undefined;
  @Input() is_help: false | number = false;
  @Output() template = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor(private webs: WebsocketService,) { }

  closeBackdrop(ev: MouseEvent, el: HTMLElement, dataMesto = false) {
    console.log(el == ev.target, dataMesto);
    if (el == ev.target) {
      if (dataMesto)
        this.dataMesto = undefined;
      else
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
    // console.log(d);
    if (d['dataMesto']?.currentValue) {
      this.podrobnee = true;
    }
  }

  readonly dialog = inject(MatDialog);
  openHelpDialog(): void {
    const dialogRef = this.dialog.open(AskHelpGoldComponent, { data: this.is_help, });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.is_help) {
        this.webs.emit('helpAsk', { to: this.data.name, gold: result })
        console.log(result);
      }
    });
  }
}
export interface cardMestoEvent {
  mesto: "first" | "second" | "bonus"
}
export interface closeEvent {
  action: string
  player: playerData
}