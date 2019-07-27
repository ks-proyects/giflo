import { SearchPipe } from '../pipes/search.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [],
  declarations: [
    SearchPipe
  ],
  exports: [SearchPipe]
})
export class SharedModule {
}