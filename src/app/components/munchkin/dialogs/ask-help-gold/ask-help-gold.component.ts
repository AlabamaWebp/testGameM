import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-ask-help-gold',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonToggleModule,
  ],
  templateUrl: './ask-help-gold.component.html',
  styleUrl: './ask-help-gold.component.scss'
})
export class AskHelpGoldComponent {
  readonly dialogRef = inject(MatDialogRef<AskHelpGoldComponent>);
  readonly data = inject<number>(MAT_DIALOG_DATA);
  mass: number[] = []
  ngOnInit() {
    for (let i = 0; i < this.data; i++) 
      this.mass[i] = i;
  }

  close1(ans?: any): void {
    console.log(ans);
    this.dialogRef.close(ans);
  }
}
