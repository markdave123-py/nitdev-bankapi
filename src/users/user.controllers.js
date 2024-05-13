import { signupSchema } from "../utils/joi.js";
import { findUser, createUser } from "./user.services.js";
import { hashPassword } from "../utils/bcrypt.js";


export const signup = async (req, res) => {

    try {
        const { error, value } = signupSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ error: error.message });
        }

        const { email, password } = value;

        const users = await findUser(email);

        if (users.length > 0) {
          return res.status(409).json({ error: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await createUser(email, hashedPassword);

        return res.status(201).json({
            message: "User created successfully",
        })

    } catch (error) {

        console.log('Error signing up user', error);
        return res.status(500).json({ error: 'Internal server error' });

    }
};
    ;