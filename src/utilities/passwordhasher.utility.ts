import * as bcrypt from 'bcrypt';

export class PasswordHasher {
    constructor() {}

    hash(password: any) : any {
        let saltRounds: number = 10;
        let salt: string = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    }
}
