import { Pool, QueryConfig } from 'pg'
import Queries from '../../utils/queries'
import { encryptPassword, queryHelper } from '../../utils/helpers'
import dotenv from 'dotenv'
import { AuthenticationError } from 'apollo-server'

dotenv.config()
const { HASHSALT } = process.env

const getUser = async (
    _: any,
    args: { input: { userId: string } },
    context: { dbConnection: Pool },
    info: any
) => {
    try {
        const { getUser } = Queries
        const {
            input: { userId },
        } = args
        const {
            rows: [user],
            rowCount,
        } = await queryHelper(getUser('userid', userId))

        if (rowCount === 0) {
            throw new Error('user was not found')
        }

        return user
    } catch (e: any) {
        throw new Error(e.message)
    }
}

interface Args {
    email: string
    password: string
    address: string
    fullname: string
    department: string
}
const createUser = async (_: any, args: Record<string, Args>) => {
    try {
        const {
            input: { email, password, address, fullname, department },
        } = args
        const { getUser, createUser } = Queries

        const response = await queryHelper(getUser('email', email))

        if (response.rowCount > 0) {
            throw new AuthenticationError('This email already exists, please sign in to continue')
        }
        const {
            rows: [user],
        } = await queryHelper(
            createUser({
                email,
                password: encryptPassword.hash(password, Number(HASHSALT)),
                address,
                department,
                name: fullname,
            })
        )

        return user
    } catch (e: any) {
        throw new Error(e.message)
    }
}

const login = async (
    _: any,
    args: Record<'input', Omit<Args, 'address' | 'fullname' | 'department'>>
) => {
    try {
        const { getUser } = Queries

        const {
            input: { password, email },
        } = args

        const {
            rows: [user],
            rowCount,
        } = await queryHelper(getUser('email', email))

        if (rowCount == 0) {
            throw new Error('Please signup to continue')
        }

        const isPasswordCorrect = encryptPassword.comparePassword(password, user.password)
        if (!isPasswordCorrect) throw new AuthenticationError('email or password is incorrect')
        console.log(user)
        return user
    } catch (e) {
        throw new AuthenticationError('An error occurred')
    }
}

export default {
    Query: {
        getUser,
    },
    Mutation: {
        createUser,
        loginUser: login,
    },
}
