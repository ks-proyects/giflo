import { UserDataBase } from './base/user-data.base';

/**
 * YOU CAN OVERRIDE HERE UserBase.ts
 */
export interface UserData extends UserDataBase {

    // Insert here your custom attributes and function

    // Functions for User


    // UTILS FUNCTIONS

    /**
     * Check if logged user is admin
    isAdmin(): boolean {
        if (!this.roles)
            return false;
        return this.roles.indexOf('ADMIN') === 0;
    }
     */

    /**
     * Check if logged user has one role
    hasRole(role: string | Array<string>): boolean {
        if (!this.roles) return false;

        if (typeof role === 'string') {
            return (this.roles.indexOf(role) !== -1);
        } else {
            const found = role.filter(rol => {
                return (this.roles.indexOf(rol) !== -1);
            });
            return found.length > 0;
        }
    }
     */

}
