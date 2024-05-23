import { createWallet } from "./wallet.service.js";
import { walletSchema } from "../validators/wallets.js";
import { getWalletByUserId } from "./wallet.service.js";
import { deleteWallet } from "./wallet.service.js";
import { getWalletById } from "./wallet.service.js";



export const createWalletController = async (req, res) => {

    try {

        const curr_user = req.user;

        if (!curr_user) {
          return res
            .status(401)
            .json({ error: "Unauthorized, you cant access this endpoint!!" });
        }

        const { error, value } = walletSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ error: error.message });
        }

        let { currency } = value;

        currency = currency.toLowerCase();

        const wallet = await createWallet(curr_user.id, currency);

        return res.status(201).json({
          message: "Wallet created successfully",
          wallet,
        });

    } catch (error) {

        console.log("Error creating wallet", error);

        return res.status(500).json({
            error: 'Error creating wallet',
        })

    }

}

export const getWalletByUserIdController = async (req, res) => {

    try {

        const curr_user = req.user;

        if (!curr_user) {
          return res
            .status(401)
            .json({ error: "Unauthorized, you cant access this endpoint!!" });
        }

        const wallet = await getWalletByUserId(curr_user.id);

        return res.status(200).json({
          message: "Wallet fetched successfully",
          wallet,
        });

    } catch (error) {

        console.log("Error fetching wallet", error);

        return res.status(500).json({
            error: 'Error fetching wallet',
        })

    }
}

export const deleteWalletController = async (req, res) => {

  try {

    const curr_user = req.user;
    const walletId = req.params.id;

    if (!curr_user) {
      return res
        .status(401)
        .json({ error: "Unauthorized, you cant access this endpoint!!" });
    }

    const wallet = await getWalletById(walletId);

    // console.log(wallet[0])

    if (!wallet) {
      return res.status(404).json({
        error: "Wallet not found",
      });
    }

    // console.log(typeof(wallet[0].userID), typeof(curr_user.id))

    if (wallet[0].userID != curr_user.id) {
      return res.status(403).json({
        error: "You are not authorized to delete this wallet",
      });
    }

    await deleteWallet(walletId);

    return res.status(200).json({
      message: "Wallet deleted successfully",
    });


  } catch (error) {

      console.log("Error deleting wallet", error);

      return res.status(500).json({
        error: "Error deleting wallet",
      });

  }

}