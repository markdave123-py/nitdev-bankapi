import { excuteQuery } from '../config/database.js';

export const findUser = async (email) => {
    try {
        const query = `SELECT * FROM users WHERE email = ?`;
        const users = await excuteQuery(query, [email]);
        return users;
    } catch (error) {

        console.log('Error finding user', error);

    }
}

export const createUser = async (email, password) => {
    try {
        const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
        const result = await excuteQuery(query, [email, password]);
        return result;
    } catch (error) {
        console.log('Error creating user', error);
    }
}

export const getUsers = async () => {
    try {
        const query = `SELECT * FROM users`;
        const users = await excuteQuery(query, []);
        return users;
    } catch (error) {
        console.log('Error getting users', error);
    }
}