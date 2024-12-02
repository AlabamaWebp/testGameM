import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, inject, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { playerData } from '../munchkin.component';
import { CardComponent, toPlayer } from '../card/card.component';
import { WebsocketService } from '../../../services/websocket/websocket.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AskHelpGoldComponent } from '../dialogs/ask-help-gold/ask-help-gold.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CardComponent, MatButtonModule, CommonModule],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent {
  @Input() data!: playerData
  @Input() only_info = false;
  @Input() info = this.only_info;
  @Input() dataMesto: toPlayer | undefined;
  @Input() can_sbros: boolean = false;
  @Input() is_help: false | number = false;
  @Output() template = new EventEmitter();
  @Output() close = new EventEmitter();


  constructor(private webs: WebsocketService,
    // private detector: ChangeDetectorRef,
  ) { }
  // get refresh() { return this.detector.detectChanges(); }
  ngOnInit() {
    this.refreshBottomCards();
  }
  refreshBottomCards() {
    this.cards_bottom = [
      {
        name: "Шлем",
        cards: this.data?.t_field.helmet,
      },
      {
        name: "Броня",
        cards: this.data?.t_field.body,
      },
      {
        name: "Обувь",
        cards: this.data?.t_field.legs,
      },
      {
        name: "Руки",
        cards: this.data?.t_field.arm,
      },
      {
        name: "Рядом",
        cards: this.data?.t_field.other,
      },
    ]
  }
  sbrosEquip(id: number) { this.webs.emit("sbrosEquip", id) }
  closeBackdrop(ev: MouseEvent, el: HTMLElement, dataMesto = false) {
    if (el == ev.target) {
      if (dataMesto) this.dataMesto = undefined;
      else this.closePodrobnee();
    }
  }
  closePodrobnee() {
    this.info = false;
    this.hide_parent = false;
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
  hide_parent = false
  ngOnChanges(d: SimpleChanges) {
    if (d['dataMesto']?.currentValue) {
      this.info = true;
      this.hide_parent = true;
      // this.refresh;
    }
    if (d["data"]) {
      // this.refresh;
      this.refreshBottomCards();
    }
  }
  readonly dialog = inject(MatDialog);
  openHelpDialog(): void {
    const dialogRef = this.dialog.open(AskHelpGoldComponent, { data: this.is_help, });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.is_help) {
        this.webs.emit('helpAsk', { to: this.data.name, gold: result })
      }
    });
  }


  cards_bottom: card[] = []
}
interface card {
  name: string
  cards: any
}
export interface cardMestoEvent {
  mesto: "first" | "second" | "bonus"
}
export interface closeEvent {
  action: string
  player: playerData
}