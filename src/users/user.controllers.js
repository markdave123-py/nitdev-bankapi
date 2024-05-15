import { signupSchema } from "../utils/joi.js";
import { findUser, createUser } from "./user.services.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { genToken } from "../utils/jwt.js";
import { sanitize } from "../utils/sanitizer.js";

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


export const siginin = async (req, res) => {

    try {

        const { error, value } = signupSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ error: error.message });
        }

        const { email, password } = value;

        const users = await findUser(email);

        if (users.length === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        const user = users[0];

        console.log(user, user.email, user.password)

        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        const accessToken = genToken({ email: user.email, id: user.id, is_valid: true});

        return res.status(200).json({
            message: "User signed in successfully",
            accessToken,
            user: sanitize(user)

        })

    } catch (error) {

        console.log('Error signing in user', error);
        return res.status(500).json({ error: 'Internal server error' });

    }

}
