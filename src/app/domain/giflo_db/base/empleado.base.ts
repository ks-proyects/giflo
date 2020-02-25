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
 *  TO CUSTOMIZE EmpleadoBase PLEASE EDIT ../empleado.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
import { Contacto } from '../contacto';
import { Direccion } from '../direccion';
import { Empresa } from '../empresa';
import { Estado } from '../estado';
import { EstadoCivil } from '../estado-civil';
import { Rol } from '../rol';
import { User } from '../user';

/**
 * This is the model of Empleado object
 *
 */
export interface EmpleadoBase {

    id: string;
    apellidos?: string;
    fechaNacimiento?: Date;
    identificacion?: string;
    nombres?: string;
    tipoIdentificacion?: string;
    urlFoto?: string;
    // Relations contacto
    contacto: Contacto | string;
    // Relations direccion
    direccion: Direccion | string;
    // Relations empresa
    empresa: Empresa | string;
    // Relations estado
    estado: Estado | string;
    // Relations estadoCivil
    estadoCivil: EstadoCivil | string;
    // Relations rol
    rol: Rol | string;
    // Relations user
    user: User | string;
}