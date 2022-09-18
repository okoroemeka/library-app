interface IcreateUser {
    email: string
    password: string
    address?: string
    department: string
    name?: string
}

class Queries {
    static createUser = ({ email, password, address = '', department, name }: IcreateUser) => {
        return {
            text: 'INSERT INTO users(email, password, address, department, name) VALUES($1,$2,$3,$4,$5) RETURNING*',
            values: [email, password, address, department, name],
        }
    }

    static getUser = (predicate: string, value: string) => {
        return {
            text: `SELECT email, address, password, department FROM users WHERE ${predicate}=$1`,
            values: [value],
        }
    }
}

export default Queries
