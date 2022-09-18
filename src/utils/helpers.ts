import { QueryConfig } from 'pg'
import bcrypt from 'bcryptjs'

import dbConnection from '../db/config'

export const queryHelper = async (query: string | QueryConfig<any[]>) => {
    return dbConnection.query(query)
}

export const encryptPassword = {
    hash: (password: string, salt: string | number) => {
        return bcrypt.hashSync(password, salt)
    },
    comparePassword: (passwordFromUser: string, passwordFromDb: string) => {
        return bcrypt.compareSync(passwordFromUser, passwordFromDb)
    },
}
