import { Component } from '@angular/core';
import { ProduccionVariedad } from 'src/app/domain/dto/produccionVariedad';
import { DeviceService } from 'src/app/services/common/device.service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MatSnackBar } from '@angular/material';
import { CultivadorService } from 'src/app/services/common/cultivador.service';

@Component({
  selector: 'app-produccion-nave',
  templateUrl: './produccion-nave.component.html',
  styles: []
})
export class ProduccionNaveComponent {
  pv: ProduccionVariedad;
  config: PerfectScrollbarConfigInterface = {};
  constructor(
    public device: DeviceService,
    private cultivadorService: CultivadorService,
    private snackBar: MatSnackBar) {
    this.pv = JSON.parse(sessionStorage.getItem('item'));
  }
  updateValue(event, cell, rowIndex) {
    this.pv.produccionCama[rowIndex][cell] = event.target.value;
    this.pv.produccionCama = [...this.pv.produccionCama];
  }
  save() {
    this.cultivadorService.save(this.pv);
    this.openSnackBar('Se guardo correctamente', 'Guardar');
  }
  confirm() {
    this.cultivadorService.confirm(this.pv);
    this.openSnackBar('Confirmacion Exitosa', 'Confirmación');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}
