import { createDeposit } from "./deposit.service.js";
import { depositSchema } from "../validators/deposit.js";
import { getWalletById } from "../wallets/wallet.service.js";


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

        let {currency, amount } = value;

        currency = currency.toLowerCase();

        if (wallet[0].currency !== currency) {
            //convert to the wallet currency
            return res.status(400).json({
                error: `Invalid currency, wallet currency is ${wallet[0].currency}`
            })
        }

        wallet[0].amount += amount;

        const deposit = await createDeposit(walletID, currency, amount);

        return res.status(201).json({
          message: "Deposit created successfully",
            deposit,
            wallet,
        });

    } catch {
        console.log("Error creating deposit", error);

        return res.status(500).json({
            error: 'Error creating deposit',
        })
    }
}