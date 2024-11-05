import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { HelpFightComponent } from '../help-fight/help-fight.component';

@Component({
  selector: 'app-ask-side',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './ask-side.component.html',
  styleUrl: './ask-side.component.scss'
})
export class AskSideComponent {
  readonly dialogRef = inject(MatDialogRef<HelpFightComponent>);
  close(b: boolean) {
    this.dialogRef.close(b);
  }
}
