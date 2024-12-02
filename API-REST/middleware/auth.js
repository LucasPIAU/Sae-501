import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).send({
        ok: false,
        error: "Access denied. No token provided"
    });

    try {
        jwt.verify(token, "jwtPrivateKey");
        next();
    } catch (error) {
        return res.status(401).send({
            ok: false,
            error: "Token expired"
        });
    }
}