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
 *  FOR CUSTOMIZE paginaBaseService PLEASE EDIT ../pagina.service.ts
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
import { Pagina } from '../../domain/giflo_db/pagina';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Pagina.service.ts
 */

/*
 * SCHEMA DB Pagina
 *
	{
		component: {
			type: 'String'
		},
		loadChildren: {
			type: 'String'
		},
		path: {
			type: 'String'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		estado: {
			type: Schema.ObjectId,
			ref : "Pagina"
		},
		pagina: {
			type: Schema.ObjectId,
			ref : "MenuItem"
		},
	}
 *
 */
@Injectable()
export class PaginaBaseService {

    private paginaCollection: AngularFirestoreCollection<Pagina>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions
    ) {
        this.paginaCollection = afs.collection<Pagina>('pagina');
    }


    // CRUD METHODS

    /**
    * PaginaService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Pagina): Promise<DocumentReference> {
        return this.paginaCollection.add(item);
    }

    /**
    * PaginaService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.paginaCollection.doc(id);
        itemDoc.delete();
    }

    /**
    * PaginaService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): AngularFirestoreDocument<Pagina> {
        return this.afs.doc<Pagina>('pagina/' + id);
    }

    /**
    * PaginaService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Pagina[]> {
        return this.afs.collection('pagina').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Pagina;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /**
    * PaginaService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(itemDoc: AngularFirestoreDocument<Pagina>, item: Pagina): Promise<void> {
        return itemDoc.update(item);
    }


    // Custom APIs

}