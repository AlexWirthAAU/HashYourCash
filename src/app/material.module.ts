import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class MaterialModule {}
