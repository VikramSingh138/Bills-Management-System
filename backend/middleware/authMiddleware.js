import jwt from "jsonwebtoken";

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user info to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authMiddleware;
