import { Component, OnInit } from '@angular/core';
import { ProduccionService } from 'src/app/services/produccion.service';
import { ProduccionDtoService } from 'src/app/services/produccion-dto.service';

@Component({
  selector: 'app-cultivo',
  templateUrl: './cultivo.component.html',
  styles: []
})
export class CultivoComponent implements OnInit {

  constructor(private produccionDtoService: ProduccionDtoService) { }

  ngOnInit() {
  }

}
