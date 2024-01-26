import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';

@NgModule({
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
  ],
})
export class AppMaterialModule {}
