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
import { Estado } from '../estado';
import { EstadoCivil } from '../estado-civil';
import { User } from '../user';

/**
 * This is the model of Empleado object
 *
 */
export interface PersonaBase {

    id: string;
    apellidos?: string;
    fechaNacimiento?: Date;
    identificacion?: string;
    nombres?: string;
    tipoIdentificacion?: string;
    urlFoto?: string;
    // Relations contacto
    contacto: Contacto;
    // Relations direccion
    direcciones: Direccion[];
    // Relations estado
    estado: Estado;
    // Relations estadoCivil
    estadoCivil: EstadoCivil;
    // Relations user
    user: User;
}