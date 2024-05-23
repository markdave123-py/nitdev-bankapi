import { excuteQuery } from "../config/database.js";

export const createDepositTable = async () => {
  try {
    const query = `CREATE TABLE IF NOT EXISTS deposits (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            walletID INT NOT NULL,
            currency VARCHAR(3) CHECK(currency IN ('NGN','USD')) NOT NULL,
            amount DECIMAL NOT NULL,
            FOREIGN KEY(walletID) REFERENCES wallets(id),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    await excuteQuery(query, []);
    console.log("Deposit table created successfully");
  } catch (error) {
    console.log("Error creating Deposit table", error);
  }
};
