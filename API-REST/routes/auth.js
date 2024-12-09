import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const authRoutes = express();


authRoutes.post("/", async (req, res) => {
    const users = [{ 
        id: 1, 
        username: process.env.AUTH_USERNAME, 
        password: process.env.AUTH_PASSWORD,
    }];

    try {
        var username = req.body.username;
        var password = req.body.password;
    } catch (error) {
        console.log("Vous devez spécifier un request body pour vous connecter");
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).send({
            ok: false,
            message: "Incorrect username"
        });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return res.status(401).send({
            ok: false,
            message: "Incorrect password"
        });
    }

    try {
        const token = jwt.sign(
            { id: user.id, roles: user.roles },
            process.env.JWT_PRIVATE_KEY || "jwtPrivateKey",
            { expiresIn: "30m" }
        );
        res.send({
            ok: true,
            token: token
        });
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: "Failed to generate token"
        });
    }
});

export default authRoutes;