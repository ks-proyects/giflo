import { Component, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ProduccionDirective } from 'src/app/directives/produccion.directive';
import { ProduccionNaveComponent } from '../produccion-nave/produccion-nave.component';
import { ProduccionVariedad } from 'src/app/domain/dto/produccionVariedad';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subscription } from 'rxjs';
import { CultivadorService } from 'src/app/services/common/cultivador.service';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styles: []
})
export class ProduccionComponent implements OnInit, OnDestroy {

  @ViewChild(ProduccionDirective, { static: true }) receptor: ProduccionDirective;

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: { enabled: true, onlyInViewport: true },
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: true,
    cubeEffect: { shadow: true }
  };
  suscription: Subscription;
  isEmpy: boolean = false;
  constructor(
    private cfr: ComponentFactoryResolver,
    private cultivadorService: CultivadorService
  ) { }

  public onIndexChange(index: number) {
  }
  ngOnInit() {
    this.suscription = this.cultivadorService.getListProduccionVariedad().subscribe(list => {
      if (this.receptor) {
        this.receptor.viewContainerRef.clear();
      }
      this.isEmpy = list.length == 0;
      list.forEach(prod => {
        this.componenteDinamico(prod);
      });
    });
  }
  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
  componenteDinamico(item: ProduccionVariedad) {
    sessionStorage.setItem('item', JSON.stringify(item));
    let cf = this.cfr.resolveComponentFactory(ProduccionNaveComponent);
    if (this.receptor) {
      let vcr = this.receptor.viewContainerRef;
      vcr.createComponent(cf, 0);
    }
  }
}
