import jwt from "jsonwebtoken"
import { UserModel } from "../Model/Model.js";

const Authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1];
        
        if (!token) return res.status(401).json({ message: "Token is missing" })
        
        const verrifyToken = jwt.verify(token, process.env.AUTH_KEY);
        if (!verrifyToken) return res.status(401).json({ message: "Token is invalid" });

        const rootUser = await UserModel.findOne({ _id: verrifyToken._id});
        if (!rootUser) return res.status(404).json({ message: "User not found" });

        req.token = token;
        req.rootUser = rootUser;
        req.rootUserId = rootUser._id;
        res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

const headersMiddleware = (req, res, next) => {
        res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
    
        next();
    };
    

export {Authenticate, headersMiddleware };