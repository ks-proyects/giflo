import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    data: {
      title: 'Inicio',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard 1' }
      ]
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
