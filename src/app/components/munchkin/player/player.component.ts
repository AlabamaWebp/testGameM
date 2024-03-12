import { Component, Input } from '@angular/core';
import { playerData } from '../munchkin.component';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  @Input() data!: playerData

  podrobnee = false;

  closeBackdrop(ev: MouseEvent) {
    const el = ev.target as HTMLElement;
    if (el.className.includes('backdrop')) {
      this.podrobnee = false
    }
  }

}
