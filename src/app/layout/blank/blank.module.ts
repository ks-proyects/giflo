import { NgModule } from '@angular/core';
import { BlankComponent } from './blank.component';
import { MatToolbarModule ,MatIconModule, MatButtonModule,MatSidenavModule, MatListModule,
  MatCheckboxModule} from '@angular/material';

@NgModule({
  declarations: [BlankComponent],
  imports: [
    
  ],
  exports:[
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCheckboxModule
  ]
})
export class BlankModule { }
