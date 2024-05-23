import { excuteQuery } from "../config/database.js";


export const createWallet = async (userID, currency) => {

    try {

        const query = `INSERT INTO wallets (userID,currency)
            VALUES (?, ?)`;
        ;

        const values = [userID, currency];

        const results = await excuteQuery(query, values);

        return results;


    } catch (error) {
        console.log('Error creating wallet', error);


    }
}


export const getWalletByUserId = async (userID) => {

    try {

        const query = `SELECT * FROM wallets WHERE userID = ?`;

        const results = await excuteQuery(query, [userID]);

        return results;

    } catch (error) {
        console.log('Error getting wallet by user id', error);
    }
}

export const getWalletById = async (walletId) => {

    try {

        const query = `SELECT * FROM wallets WHERE id = ?`;

        const results = await excuteQuery(query, [walletId]);

        return results;
    } catch (error) {
        console.log('Error getting wallet by id', error);
    }
}


export const deleteWallet = async (walletId) => {

    try {

        const query = `DELETE FROM wallets WHERE id = ?`;

        const results = await excuteQuery(query, [walletId]);
    } catch (error) {
        console.log('Error deleting wallet by user id', error);
    }

}