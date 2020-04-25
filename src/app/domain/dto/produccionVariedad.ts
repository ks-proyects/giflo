import { Bloque } from '../giflo_db/bloque';
import { Nave } from '../giflo_db/nave';
import { Variedad } from '../giflo_db/variedad';
import { Empleado } from '../giflo_db/empleado';
import { Empresa } from '../giflo_db/empresa';
import { DiaTrabajo } from '../giflo_db/dia-trabajo';
import { ProduccionCama } from './produccionCama';

export interface ProduccionVariedad {
    bloque?: Bloque;
    nave?: Nave;
    variedad?: Variedad;
    trabajador?: Empleado;
    supervisor?: Empleado;
    empresa?: Empresa | string;
    diaTrabajo?: DiaTrabajo | string;
    estado?: string;
    produccionCama?: ProduccionCama[];
    color?:string;
}
