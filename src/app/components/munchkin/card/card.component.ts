import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor() {
  }
  @Input() data: AbstractCard | any = undefined
  @Input() treasure: boolean = false;
  ngOnInit() {
    if (this.data?.abstractData.cardType == "Сокровище") {
      this.treasure = true;
      this.tCard = this.data;
    }
    else {
      this.dCard = this.data;
    }
  }
  tCard: TreasureCard | undefined;
  dCard: DoorCard | undefined;
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
  podrobnee = false;

  closeBackdrop(ev: MouseEvent) {
    const el = ev.target as HTMLElement;
    if (el.className.includes('backdrop')) {
      this.podrobnee = false
    }
  }

}

interface TreasureCard {
  abstractData: AbstractData,
  strongest: number,
  data: TreasureData,
}
interface DoorCard {
  abstractData: AbstractData,
  data: MonsterData,
}

interface AbstractData {
  name: string;
  description: string;
  cardType: "Класс" | "Раса" | "Проклятие" | "Монстр" | "Сокровище"
  img?: string;
}
interface MonsterData {
  get_lvls: number;
  strongest: number;
  gold: number;
  undead: boolean;
}
interface TreasureData {
  treasureType: "Надеваемая" | "Используемая" | "Боевая"
  template?: "Шлем" | "Броник" | "Ноги" | "Рука"
  | "2 Руки" | "3 Руки" | "Рядом" | undefined
  cost?: number | undefined
  big?: boolean | undefined
}



export interface AbstractCard {
  abstractData: AbstractData;
  id: number;
  strong?: number;
  data?: TreasureData | MonsterData;
}