// BASE SERVICE
import { UserBaseService } from './base/user.base.service';
import { Injectable } from '@angular/core';
import { User } from '../domain/giflo_db/user';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';


// start documentation
/**
 * Custom APIs
 *
 * Service.changePassword
 *	@description Change password of user from admin
 *	@returns object
 *
 */
// end documentation

/**
 * YOU CAN OVERRIDE HERE UserBaseService
 */
@Injectable()
export class UserService extends UserBaseService {

    
}
