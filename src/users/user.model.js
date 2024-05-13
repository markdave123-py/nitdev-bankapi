import { excuteQuery } from "../config/database.js";


export const createUserTable = async () => {
    try {
        const query = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

        await excuteQuery(query, []);
        console.log('User table created successfully');
    } catch (error) {
        console.log('Error creating user table', error);
    }
}