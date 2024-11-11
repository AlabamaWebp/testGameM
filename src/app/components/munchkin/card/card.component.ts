import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { WebsocketService } from '../../../services/websocket.service';
import { CommonModule } from '@angular/common';
// import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButton, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    // trigger("width", [
    //   transition(":leave", [animate(300, style({ width: 0, opacity: 0 }))])
    // ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  constructor(private webs: WebsocketService, private detector: ChangeDetectorRef) { }
  get refresh() { return this.detector.detectChanges(); }
  @Input() data?: AbstractCard
  @Input() treasure: boolean = false;
  @Input() can_sbros: boolean = false;
  @Input() can_sell: boolean = false;
  @Input() main: boolean = false;

  @Output() use_mesto = new EventEmitter<toPlayer>();
  @Output() use_side = new EventEmitter<number>();
  @Output() use_card = new EventEmitter<number>();
  @Output() sbros = new EventEmitter<number>();

  useCard() {
    const id = this.data?.id;
    if (!id && id != 0) return
    if (this.is_mesto && !this.treasure) {
      const tmp: toPlayer = {
        id: id,
        type: this.data?.abstractData.cardType ?? ''
      }
      this.use_mesto.emit(tmp);
      setTimeout(() => {
        this.podrobnee = false;
      }, 1); // --todo переделать
    }
    else if (this.is_side) this.use_side.emit(id);
    else this.use_card.emit(id)
  }
  sbrosCard() { this.sbros.emit(this.data?.id); }
  sellCard() { this.webs.emit("sellCard", this.data?.id); }
  ngOnChanges(d: SimpleChanges) {
    if (d["data"]?.currentValue) {
      this.ngOnInit();
    }
  }
  data_: WritableSignal<AbstractCard | undefined> = signal(undefined)
  ngOnInit() {
    if (this.data?.abstractData.cardType == "Сокровище") {
      this.treasure = true;
      this.tCard = this.data as any;
      if ((this.data.data as TreasureData).treasureType == "Боевая")
        this.is_side = true;
    }
    else {
      if (
        !this.data?.is_super
        && (this.data?.abstractData.cardType == "Класс"
          || this.data?.abstractData.cardType == "Раса")
      ) this.is_mesto = true;
      this.dCard = this.data as any;
    }
    this.refresh;
  }

  is_mesto = false;
  is_side = false;

  tCard: TreasureCard | undefined;
  dCard: DoorCard | undefined;

  podrobnee = false;

  closeBackdrop(ev: MouseEvent) {
    const el = ev.target as HTMLElement;
    if (el.className.includes('backdrop')) {
      this.podrobnee = false
    }
  }
  test(v: any) {
    console.log(v);
    return v
  }
}







export interface toPlayer {
  id: number,
  type: string // "Класс" | "Раса"
}
interface TreasureCard {
  abstractData: AbstractData,
  strongest: number,
  data: TreasureData,
  id: number
}
interface DoorCard {
  abstractData: AbstractData,
  data?: MonsterData,
  id: number
}

interface AbstractData {
  name: string;
  description: string;
  cardType: "Класс" | "Раса" | "Проклятие" | "Монстр" | "Сокровище"
  img?: string;
  cost: number
}
interface MonsterData {
  get_lvls: number;
  strongest: number;
  gold: number;
  undead?: boolean;
}
interface TreasureData {
  treasureType: "Надеваемая" | "Используемая" | "Боевая"
  template?: "Шлем" | "Броник" | "Ноги" | "Рука"
  | "2 Руки" | "3 Руки" | "Рядом" | undefined
  big?: boolean | undefined
}



export interface AbstractCard {
  abstractData: AbstractData;
  id: number;
  strong?: number;
  data?: TreasureData | MonsterData;
  is_super?: boolean
  use: boolean
}


// tCard: TreasureCard = {
//   abstractData: {
//     name: "Коротышные латы",
//     description: "Только для дварфов",
//     cardType: "Сокровище"
//   },
//   data: {
//     treasureType: "Надеваемая",
//     template: "Рядом",
//     cost: 1200,
//     // big: true
//   },
//   strongest: 2
// }

// dCard: DoorCard = {
//   abstractData: {
//     name: "3872 орка",
//     description: "+6 против дварфов (старые счёты)",
//     cardType: "Монстр"
//   },
//   data: {
//     lvl: 10,
//     gold: 3,
//     strongest: 10,
//     undead: false,
//   },
// }