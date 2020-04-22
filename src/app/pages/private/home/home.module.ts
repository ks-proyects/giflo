import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './profile/profile.component';
import { routesHome } from './home-routing.module';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UtilModule } from 'src/app/util/util.module';
import { CoreMaterialModule } from 'src/app/core.material.module';
import { AddressDialogComponent } from './address-dialog/address-dialog.component';
import { RouterModule } from '@angular/router';
import { EmpresaDialogComponent } from './empresa-dialog/empresa-dialog.component';
import { EmpleadoDialogComponent } from './empleado-dialog/empleado-dialog.component';
import { IndexComponent } from './index.component';
import { CultivoComponent } from './cultivo/cultivo.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { PostcosechaComponent } from './postcosecha/postcosecha.component';
import { GerenteComponent } from './gerente/gerente.component';
import { CosechaDirective } from 'src/app/directives/cosecha.directive';
import { ContainerComponent } from './container/container.component';
import { HomeDirective } from 'src/app/directives/home.directive';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { DefaultComponent } from './default/default.component';
import { ChartistModule } from 'ng-chartist';
import { ChartsModule } from 'ng2-charts';
import { ProduccionDirective } from 'src/app/directives/produccion.directive';
import { ProduccionNaveComponent } from './produccion-nave/produccion-nave.component';
import { ProduccionComponent } from './produccion/produccion.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  imports: [
    RouterModule.forChild(routesHome),
    CommonModule,
    UtilModule,
    FormsModule,
    FlexLayoutModule,
    CoreMaterialModule,
    ChartistModule,
    ChartsModule,
    SwiperModule
  ],
  entryComponents: [
    AddressDialogComponent,
    EmpresaDialogComponent,
    EmpleadoDialogComponent,
    GerenteComponent,
    PostcosechaComponent,
    SupervisorComponent,
    CultivoComponent,
    SuperAdminComponent,
    DefaultComponent,
    ProduccionNaveComponent
  ],
  declarations: [
    ProfileComponent,
    SettingComponent,
    ProfileEditComponent,
    AddressDialogComponent,
    EmpresaDialogComponent,
    EmpleadoDialogComponent,
    IndexComponent,
    CosechaDirective,
    HomeDirective,
    ContainerComponent,
    GerenteComponent,
    PostcosechaComponent,
    SupervisorComponent,
    CultivoComponent,
    SuperAdminComponent,
    DefaultComponent,
    ProduccionDirective,
    ProduccionComponent,
    ProduccionNaveComponent
  ],
  exports: [],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class HomeModule { }
