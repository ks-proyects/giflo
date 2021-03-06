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
 *  FOR CUSTOMIZE direccionBaseService PLEASE EDIT ../direccion.service.ts
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
import { Direccion } from '../../domain/giflo_db/direccion';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Direccion.service.ts
 */

/*
 * SCHEMA DB Direccion
 *
	{
		calleNumero: {
			type: 'String'
		},
		callePrincipal: {
			type: 'String'
		},
		calleSecundaria: {
			type: 'String'
		},
		codigoPostal: {
			type: 'Integer'
		},
		referencia: {
			type: 'String'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		direccion: {
			type: Schema.ObjectId,
			ref : "Empleado"
		},
	}
 *
 */
@Injectable()
export class DireccionBaseService {

    private direccionCollection: AngularFirestoreCollection<Direccion>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions
    ) {
        this.direccionCollection = afs.collection<Direccion>('direccion');
    }


    // CRUD METHODS


    listByPerson(idUser: string): Observable<Direccion[]> {
        return this.afs.collection<Direccion>('direccion', ref => ref.where('user', '==', idUser)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Direccion;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    list(): Observable<Direccion[]> {
        return this.direccionCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Direccion;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
    create(item: Direccion): Promise<DocumentReference> {
        return this.direccionCollection.add(item);
    }
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.direccionCollection.doc(id);
        itemDoc.delete();
    }
    get(id: string): AngularFirestoreDocument<Direccion> {
        return this.afs.doc<Direccion>('direccion/' + id);
    }
    update(itemDoc: AngularFirestoreDocument<Direccion>, item: Direccion): Promise<void> {
        return itemDoc.update(item);
    }


    // Custom APIs

}
