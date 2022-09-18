import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

let ssl

const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    NODE_ENV,
    TEST_DB,
    DATABASE_DEV_URL,
    DATABASE_URL,
} = process.env

const config = {
    user: DB_USERNAME,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    max: 10,
    idleTimeoutMillis: 3000,
}

let connectionString: string | undefined

if (NODE_ENV === 'test') {
    connectionString = TEST_DB
    ssl = false
} else if (NODE_ENV === 'production') {
    connectionString = DATABASE_URL
    ssl = true
} else {
    connectionString = DATABASE_DEV_URL
}
const dbConnection = new pg.Pool({ connectionString, ssl })

export default dbConnection
