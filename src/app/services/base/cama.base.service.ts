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
 *  FOR CUSTOMIZE camaBaseService PLEASE EDIT ../cama.service.ts
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
import { environment } from '../../../environments/environment';

// MODEL
import { Cama } from '../../domain/giflo_db/cama';
import { SessionService } from '../common/session.service';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Cama.service.ts
 */

/*
 * SCHEMA DB Cama
 *
	{
		nombre: {
			type: 'String'
		},
		orden: {
			type: 'Integer'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		estado: {
			type: Schema.ObjectId,
			ref : "Cama"
		},
		nave: {
			type: Schema.ObjectId,
			ref : "Cama"
		},
		supervisor: {
			type: Schema.ObjectId,
			ref : "Cama"
		},
		trabajador: {
			type: Schema.ObjectId,
			ref : "Cama"
		},
		variedad: [{
			type: Schema.ObjectId,
			ref : "Cama"
		}],
	}
 *
 */
@Injectable()
export class CamaBaseService {
    idEmpresa: string;
    idEmpleado: string;
    private camaCollection: AngularFirestoreCollection<Cama>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions,
        private session: SessionService,
    ) {
        this.idEmpresa = '-1';
        this.idEmpleado = '-1';
        this.session.getUser().subscribe(user => {
            if (user) {
                this.idEmpresa = user.currentIdEmpresa ? user.currentIdEmpresa : '-1';
                this.idEmpleado = user.currentEmpleado ? user.currentEmpleado : '-1';
                this.camaCollection = this.afs.collection<Cama>('cama', ref => ref.where('empresa', '==', this.idEmpresa));
            }
        });
    }

    // CRUD METHODS

    /**
    * CamaService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Cama): Promise<DocumentReference> {
        item.empresa = this.idEmpresa;
        return this.camaCollection.add(item);
    }

    /**
    * CamaService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.camaCollection.doc(id);
        itemDoc.delete();
    }

    /**
    * CamaService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): AngularFirestoreDocument<Cama> {
        return this.afs.doc<Cama>('cama/' + id);
    }

    /**
    * CamaService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Cama[]> {
        return this.camaCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Cama;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    listUser(): Observable<Cama[]> {
        return this.afs.collection<Cama>('cama', ref => ref.
            where('empresa', '==', this.idEmpresa).
            where('trabajador', '==', this.idEmpleado)
        ).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Cama;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    /**
    * CamaService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(itemDoc: AngularFirestoreDocument<Cama>, item: Cama): Promise<void> {
        return itemDoc.update(item);
    }


    // Custom APIs

}
