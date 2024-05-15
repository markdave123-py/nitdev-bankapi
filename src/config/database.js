import mysql from 'mysql'
import { config } from './env.js'


const connection = mysql.createPool({
    connectionLimit: 100,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})


export const excuteQuery = (query, values) => {
    return new Promise((resolve, reject) => {

        connection.getConnection((err, connection) => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            connection.query(query, values, (error, results) => {
                connection.release()
                if (error) {
                    console.log(error)
                    return reject(error)
                }
                return resolve(results)
            })
        })
    })
}