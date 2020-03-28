/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|


 * DO NOT EDIT THIS FILE!!
 *
 *  TO CUSTOMIZE CamaBase PLEASE EDIT ../cama.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
import { Estado } from '../estado';
import { Nave } from '../nave';
import { Empleado } from '../empleado';
import { Variedad } from '../variedad';

/**
 * This is the model of Cama object
 *
 */
export interface CamaBase {

    id: string;
    nombre?: string;
    orden?: number;
    // Relations estado
    estado: Estado | string;
    // Relations nave
    nave: Nave | string;
    // Relations supervisor
    supervisor: Empleado | string;
    // Relations trabajador
    trabajador: Empleado | string;
    // Relations m:m variedad
    variedad: Variedad[] | string[]
}
