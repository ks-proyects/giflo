import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/domain/giflo_db/empresa';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  listEmpresa: Empresa[];
  persona: any = {};
  constructor(
    private session: SessionService,
    private empresaServ: EmpresaService,
    private personaServ: PersonaService) {
    session.getDataUser().subscribe(obj => {
      if (obj.user) {
        this.user = obj.user;
        personaServ.get(obj.user.id).valueChanges().subscribe(emple => {
          this.persona = emple;
        });
      }
    });
    empresaServ.listByUser().subscribe(list => { this.listEmpresa = list; });
  }
  ngOnInit() {
  }
}
