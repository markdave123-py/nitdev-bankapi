import express from 'express';
import { createUserTable } from './users/user.model.js';
import { userRouter } from './users/user.routes.js';
import { config } from './config/env.js';
import { createWalletTable } from './wallets/wallet.model.js';
import { auth } from './middlewares/auth.js';
import { walletRouter } from './wallets/wallet.route.js';
import { createDepositTable } from './deposit/deposit.model.js';
import { depositRouter } from './deposit/deposit.routes.js'

const app = express();

app.use(express.json());



app.get('/', auth, (req, res) =>{
    res.status(200).json({
        message: 'Welcome to the home page',
        user: req.user
    })
});

app.use("/user", userRouter);
app.use("/wallet", walletRouter)
app.use("/deposit", depositRouter)



app.listen(config.port, async () => {
    await createUserTable();
    await createWalletTable();
    await createDepositTable();
    console.log(`server running on port ${config.port}`)
})
