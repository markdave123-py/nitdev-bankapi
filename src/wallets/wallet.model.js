import { excuteQuery } from "../config/database.js";

export const createWalletTable = async () => {
  try {
      const query = `CREATE TABLE IF NOT EXISTS wallets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        amount DOUBLE PRECISION CHECK (amount >= 0) NOT NULL DEFAULT 0,
        currency VARCHAR(3) CHECK (currency IN ('USD', 'NGN')) NOT NULL,
        userID INT NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`;

    await excuteQuery(query, []);
    console.log("Database connection successfully");
  } catch (error) {
    console.log("Error creating user table", error);
  }
};
