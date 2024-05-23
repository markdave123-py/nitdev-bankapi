import { excuteQuery } from "../config/database.js";


export const createDeposit = async (walletID, currency, amount) => {

    try {

        const query = `INSERT INTO deposits (walletID,currency,amount)
            VALUES (?, ?, ?)`;

        const values = [walletID, currency, amount];

        const results = await excuteQuery(query, values);

        return results;
    } catch (error) {
        console.log('Error creating deposit', error)
    }
}