import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-card-creator',
  standalone: true,
  imports: [MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  CommonModule],
  templateUrl: './card-creator.component.html',
  styleUrl: './card-creator.component.scss'
})
export class CardCreatorComponent {
  abstractData: AbstractData = {
    name: "",
    description: "",
    cardType: "Класс", // Сокровище"  // "Класс" | "Раса" | "Проклятие" | "Монстр" | "МонстрБаф"
    img: "",
    cost: 1
  }
  types = ["Сокровище","Класс", "Раса", "Проклятие", "Монстр", "МонстрБаф"]
  MonsterData: MonsterData = {
    get_lvls: 1,
    strongest: 1,
    gold: 1,
    undead: false,
  }
  TreasureData: TreasureData = {
    treasureType: "Надеваемая", //. "Надеваемая" | "Используемая" | "Боевая"
    template: "Шлем", //  "Шлем" | "Броник" | "Ноги" | "Рука", | "2 Руки" | "3 Руки" | "Рядом",
    big: false
  }
  tresTypes = ["Надеваемая", "Используемая", "Боевая"];
  templateTypes = ["Шлем", "Броник", "Ноги", "Рука", "2 Руки", "3 Руки", "Рядом",]
  is_super = false
  changeType(s: string) {
    this.abstractData.cardType = s as any;
  }
  test() {
    console.log(this.abstractData, this.MonsterData);
  }
}

// return new DoorCard(
//   this.abstractData.name,
//   this.abstractData.description,
//   this.abstractData.cardType as "Класс" | "Раса" | "Проклятие" | "Монстр",
//   {
//       monster: this.monster,
//       defs: this.defs,
//       is_super: this.is_super,
//       cost: this.abstractData.cost,
//       img: this.abstractData.img,
//       monsterBuff: this.monsterBuff
//   }
// )

export interface MonsterData {
  get_lvls: number; // 
  strongest: number;
  gold: number;
  undead: boolean;
}
export interface TreasureData {
  treasureType: "Надеваемая" | "Используемая" | "Боевая"

  template?: "Шлем" | "Броник" | "Ноги" | "Рука"
  | "2 Руки" | "3 Руки" | "Рядом"

  big?: boolean
}
class AbstractCard {
  constructor(data: AbstractData) { this.abstractData = data }
  abstractData: AbstractData;
}
export interface AbstractData {
  name: string;
  description: string;
  cardType: DoorTypes | "Сокровище"
  img?: string;
  cost?: number
}
// Bonus Ability Fight
export class TreasureCard extends AbstractCard {
  constructor(
    name: string,
    description: string,
    // defs?: TreasureDefs,
    data: TreasureData,
    strongest?: number,
    cost?: number,
    img?: string
  ) {
    super({ name, description, cardType: "Сокровище", cost, img });
    this.data = data;
    this.strong = strongest;
    // this.defs = defs;
  }
  strong?: number;
  data: TreasureData;
}
export type DoorTypes = "Класс" | "Раса" | "Проклятие" | "Монстр" | "МонстрБаф"
export interface IMonsterBuff {
  strong: number
  gold: number
}
export class DoorCard extends AbstractCard {
  constructor(
    name: string,
    description: string,
    type: DoorTypes,
    optional: {
      monster?: MonsterData,
      // defs?: DoorsDefs,
      is_super?: boolean,
      cost?: number,
      img?: string,
      monsterBuff?: IMonsterBuff
    }
  ) {
    super({ name, description, cardType: type, img: optional.img, cost: optional.cost });
    this.monster = optional.monster;
    // this.defs = optional.defs;
    this.is_super = optional.is_super
  }
  monster?: MonsterData | undefined;
  // defs: DoorsDefs | undefined;
  is_super: boolean | undefined;
  // game?: MunchkinGame;
  monsterBuff?: IMonsterBuff // для бафа монстров
}
export interface IDoor {
  abstractData: AbstractData;
  data: MonsterData;
  id: number;
  is_super: boolean;
  use: boolean;
}
