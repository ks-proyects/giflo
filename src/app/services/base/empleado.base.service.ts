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
 *  FOR CUSTOMIZE empleadoBaseService PLEASE EDIT ../empleado.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
// DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

// CONFIG

// MODEL
import { Empleado } from '../../domain/giflo_db/empleado';
import { SessionService } from '../session.service';
import { UserService } from '../user.service';
import { User } from 'src/app/domain/giflo_db/user';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Empleado.service.ts
 */

/*
 * SCHEMA DB Empleado
 *
	{
		apellidos: {
			type: 'String'
		},
		fechaNacimiento: {
			type: 'Date'
		},
		identificacion: {
			type: 'String'
		},
		nombres: {
			type: 'String'
		},
		tipoIdentificacion: {
			type: 'String'
		},
		urlFoto: {
			type: 'String'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		contacto: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
		direccion: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
		empresa: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
		estado: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
		estadoCivil: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
		rol: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
		supervisor: {
			type: Schema.ObjectId,
			ref : "Cama"
		},
		trabajador: {
			type: Schema.ObjectId,
			ref : "Cama"
		},
		user: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
	}
 *
 */
@Injectable()
export class EmpleadoBaseService {

    idEmpresa: string;
    private empleadoCollection: AngularFirestoreCollection<Empleado>;
    private empleadoActiveCollection: AngularFirestoreCollection<Empleado>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions,
        private session: SessionService,
        private userService: UserService
    ) {
        session.getUser().subscribe(ui => {
            if (ui) {
                this.idEmpresa = ui.currentIdEmpresa ? ui.currentIdEmpresa : '-1';
                this.empleadoCollection = afs.collection<Empleado>('empleado', ref => ref.where('empresa', '==', this.idEmpresa));
                this.empleadoActiveCollection = afs.collection<Empleado>('empleado', ref => ref.where('empresa', '==', this.idEmpresa)
                    .where('estado', '==', 'ACT'));
            }
        });
    }


    // CRUD METHODS

    /**
    * EmpleadoService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Empleado): Promise<DocumentReference> {
        return this.empleadoCollection.add(item);
    }

    /**
    * EmpleadoService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.empleadoCollection.doc(id);
        itemDoc.delete();
    }

    /**
    * EmpleadoService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): AngularFirestoreDocument<Empleado> {
        return this.afs.doc<Empleado>('empleado/' + id);
    }

    /**
    * EmpleadoService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Empleado[]> {
        return this.empleadoCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Empleado;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    listActive(): Observable<Empleado[]> {
        return this.empleadoActiveCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Empleado;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    listByUser(idUser: string): Observable<Empleado[]> {
        return this.afs.collection<Empleado>('empleado', ref => ref.where('user', '==', idUser)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Empleado;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    listByUserAndCompany(idUser: string, idEmpresa: string): Observable<Empleado[]> {
        return this.afs.collection<Empleado>('empleado', ref =>
            ref.where('user', '==', idUser).where('empresa', '==', idEmpresa))
            .snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Empleado;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            );
    }
    listByUserActive(idUser: string): Observable<Empleado[]> {
        return this.afs.collection<Empleado>('empleado', ref => ref.where('user', '==', idUser)
            .where('estado', '==', 'ACT')).snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as Empleado;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                }))
            );
    }


    /**
    * EmpleadoService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(itemDoc: AngularFirestoreDocument<Empleado>, item: Empleado): Promise<void> {
        this.userService.updateRols(item.user as string, item.roles as string[]);
        return itemDoc.update(item);
    }


    // Custom APIs

}
