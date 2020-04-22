// BASE SERVICE
import { ProduccionBaseService } from './base/produccion.base.service';
import { Subscription, Observable } from 'rxjs';
import { Variedad } from '../domain/giflo_db/variedad';
import { Produccion } from '../domain/giflo_db/produccion';
import { ProduccionVariedad } from '../domain/dto/produccionVariedad';
import { leftJoinDocument } from './generic/leftJoin.service';
import { ProduccionCama } from '../domain/dto/produccionCama';


// start documentation
/**
 * Custom APIs
 *
 */
// end documentation

/**
 * YOU CAN OVERRIDE HERE produccionBaseService
 */
export class ProduccionService extends ProduccionBaseService {

}
