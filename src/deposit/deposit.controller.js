import { createDeposit } from "./deposit.service.js";
import { depositSchema } from "../validators/deposit.js";
import { getWalletById } from "../wallets/wallet.service.js";
import { depositIntoWallet } from "./deposit.service.js";
import { convertCurrency } from "../utils/converter.js";


export const createDepositController = async (req, res) => {

    try {

        const walletID = req.params.walletID;
        const curr_user = req.user;

        if (!curr_user) {
          return res
            .status(401)
            .json({ error: "Unauthorized, you cant access this endpoint!!" });
        }

        const { error, value } = depositSchema.validate(req.body);


        if (error) {
          return res.status(400).json({ error: error.message });
        }

        const wallet = await getWalletById(walletID);

        if (wallet.length == 0) {
            return res.status(404).json({
                error: 'Wallet not found'
            })
        }

        let { currency, amount } = value;

        currency = currency.toLowerCase();

        if (wallet[0].currency !== currency) {
            amount = await convertCurrency(currency, wallet[0].currency, amount);
        }

        if(!amount) {
            return res.status(400).json({
                error: 'Error converting currency'
            })
        }

        amount = parseFloat(amount);

        if(isNaN(amount) || amount <= 0) {
            return res.status(400).json({
                error: 'Invalid amount'
            })
        }

        await depositIntoWallet(walletID, amount);

        await createDeposit(walletID, currency, amount);

        const updatedWallet = await getWalletById(walletID);

        return res.status(201).json({
          message: "Deposit created successfully",
            updatedWallet,
        });

    } catch(error) {
        console.log("Error creating deposit", error.message);

        return res.status(500).json({
            error: 'Error creating deposit',
        })
    }
}