import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

const scriptAsync = promisify(scrypt);

export class Authentication{
    async pwdToHash(password: string){
        const salt = randomBytes(8).toString('hex');
        const buf = (await scriptAsync(password, salt, 64)) as Buffer

        return `${buf.toString('hex')}.${salt}`
    }
}