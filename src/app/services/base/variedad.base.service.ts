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
 *  FOR CUSTOMIZE variedadBaseService PLEASE EDIT ../variedad.service.ts
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
import { Variedad } from '../../domain/giflo_db/variedad';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Variedad.service.ts
 */

/*
 * SCHEMA DB Variedad
 *
	{
		color: {
			type: 'String'
		},
		cuidados: {
			type: 'String'
		},
		indicaciones: {
			type: 'String'
		},
		nombreCientifico: {
			type: 'String'
		},
		nombreComun: {
			type: 'String'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		variedad: [{
			type: Schema.ObjectId,
			ref : "Cama"
		}],
	}
 *
 */
@Injectable()
export class VariedadBaseService {

    private variedadCollection: AngularFirestoreCollection<Variedad>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions
    ) {
        this.variedadCollection = afs.collection<Variedad>('variedad');
    }


    // CRUD METHODS

    /**
    * VariedadService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Variedad): Promise<DocumentReference> {
        return this.variedadCollection.add(item);
    }

    /**
    * VariedadService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.variedadCollection.doc(id);
        itemDoc.delete();
    }

    /**
    * VariedadService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): AngularFirestoreDocument<Variedad> {
        return this.afs.doc<Variedad>('variedad/' + id);
    }

    /**
    * VariedadService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Variedad[]> {
        return this.afs.collection('variedad').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Variedad;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /**
    * VariedadService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(itemDoc: AngularFirestoreDocument<Variedad>, item: Variedad): Promise<void> {
        return itemDoc.update(item);
    }


    // Custom APIs

}